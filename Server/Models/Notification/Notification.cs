using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Notification
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public AppUser User { get; set; } = default!;
        public NotificationType Type { get; set; }
        public string Payload { get; set; } = default!;
        public bool IsRead { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
    }
}

