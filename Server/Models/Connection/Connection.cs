namespace Server.Models;

public class Connection
{
    public int Id { get; set; }
    public int RequesterId { get; set; }
    public AppUser Requester { get; set; } = null!;
    public int ReceiverId { get; set; }
    public AppUser Receiver { get; set; } = null!;
    public ConnectionStatus Status { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}


