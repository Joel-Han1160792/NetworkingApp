using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class ChannelMembership
    {
        public int Id { get; set; }
        public int ChannelId { get; set; }
        public Channel Channel { get; set; } = default!;
        public int UserId { get; set; }
        public User User { get; set; } = default!;
        public ChannelRole Role { get; set; } // 0=Member, 1=Admin
        public DateTimeOffset JoinedAt { get; set; }
    }
}