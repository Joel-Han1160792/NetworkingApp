using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Models;
namespace Server.Handlers
{
    public interface IJwtService
    {
        string GenerateToken(AppUser user);
    }
}