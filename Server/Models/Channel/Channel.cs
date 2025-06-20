using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Channel
    {
        public int Id { get; set; }
        public ChannelType Type { get; set; } // 0 = Direct, 1 = Group
        public string? Name { get; set; }
        public int CreatedBy { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public ICollection<ChannelMembership> Members { get; set; } = new List<ChannelMembership>();
        public ICollection<Message> Messages { get; set; } = new List<Message>();
    }
}