using Microsoft.AspNetCore.Identity;

namespace Server.Models;

public class AppUser : IdentityUser<int>  
{
    //Customised attrubutes
    public string? DisplayName { get; set; } 
    public string? Bio { get; set; }
    public string? AvatarUrl { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    // Relationship with other tables
    public ICollection<Connection> Connections { get; set; } = new List<Connection>();
    public ICollection<Message> MessagesSent { get; set; } = new List<Message>();
    public ICollection<Message> MessagesReceived { get; set; } = new List<Message>();
}
