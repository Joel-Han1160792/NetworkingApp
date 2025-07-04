using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
using Server.Repositories;
using Server.Models;
using Microsoft.AspNetCore.Authorization;

namespace Server.Hubs
{   [Authorize]
    public class ChatHub : Hub
    {
        // Mapping from userId (string) to connectionId
        private static readonly Dictionary<string, string> _userConnections = new();
        private readonly IMessageRepository _messageRepository;

        public ChatHub(IMessageRepository messageRepository)
        {
            _messageRepository = messageRepository;
        }

        public override Task OnConnectedAsync()
        {
            // Get userId from JWT claims (sub claim, string)
            var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            foreach (var claim in Context.User.Claims)
                Console.WriteLine($"[CLAIM] {claim.Type}: {claim.Value}");

            if (!string.IsNullOrEmpty(userId))
            {
                lock (_userConnections)
                {
                    _userConnections[userId] = Context.ConnectionId;
                }
            }
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!string.IsNullOrEmpty(userId))
            {
                lock (_userConnections)
                {
                    _userConnections.Remove(userId);
                }
            }
            return base.OnDisconnectedAsync(exception);
        }

        // Broadcast message to all users (chatroom)
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        // One-to-one messaging
        public async Task SendPrivateMessage(string receiverUserId, string message)
        {   Console.WriteLine($"[DEBUG] IsAuthenticated: {Context.User?.Identity?.IsAuthenticated}");
            Console.WriteLine($"[DEBUG] AuthenticationType: {Context.User?.Identity?.AuthenticationType ?? "null"}");

            if (Context.User != null)
            {
                foreach (var claim in Context.User.Claims)
                {
                    Console.WriteLine($"[DEBUG] Claim: {claim.Type} = {claim.Value}");
                }
            }
            else
            {
                Console.WriteLine($"IsAuthenticated: {Context.User?.Identity?.IsAuthenticated}");
}

            try
            {
                // Get sender's userId from JWT claims (should be string, parse to int)
                var senderUserIdStr =
                    Context.User?.FindFirst("sub")?.Value ??
                    Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0";

                Console.WriteLine($"[DEBUG] Received senderUserIdStr: {senderUserIdStr}");
                var senderDisplayName = Context.User?.FindFirst("displayName")?.Value ?? senderUserIdStr;

                // Safely convert userId string to int
                if (!int.TryParse(senderUserIdStr, out var senderUserIdInt))
                    throw new UnauthorizedAccessException("Invalid sender user id in token.");
                if (!int.TryParse(receiverUserId, out var receiverUserIdInt))
                    throw new ArgumentException("Invalid receiver user id.");

                // Find receiver's connection id
                string? connectionId;
                lock (_userConnections)
                {
                    _userConnections.TryGetValue(receiverUserId, out connectionId);
                }
                // 临时加输出日志
                Console.WriteLine($"sender: {senderUserIdInt}, receiver: {receiverUserIdInt}");

                // Save message to database

                await _messageRepository.SaveAsync(new Message
                {
                    SenderId = senderUserIdInt,
                    ReceiverId = receiverUserIdInt,
                    Content = message,
                    SentAt = DateTime.UtcNow
                });

                // Send to receiver if online
                if (connectionId != null)
                {
                    await Clients.Client(connectionId).SendAsync(
                        "ReceivePrivateMessage", senderUserIdStr, senderDisplayName, message
                    );
                }
                // Also send a copy back to sender (optional, UI feedback)
                await Clients.Caller.SendAsync(
                    "ReceivePrivateMessage", senderUserIdStr, senderDisplayName, message
                );
            }
            catch (Exception ex)
            {
                Console.WriteLine($"SendPrivateMessage ERROR: {ex}");
                throw;
            }
        }
    }
}
