namespace Server.Models;

public class Message
{
    public int Id { get; set; }
    public int SenderId { get; set; }
    public AppUser Sender { get; set; } = null!;
    public int ReceiverId { get; set; }
    public AppUser Receiver { get; set; } = null!;
    public string Content { get; set; } = string.Empty;
    public DateTime SentAt { get; set; } = DateTime.UtcNow;
}
