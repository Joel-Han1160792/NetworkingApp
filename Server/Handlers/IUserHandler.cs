using Server.Models;

namespace Server.Handlers;

public interface IUserHandler
{
    Task<AppUser> RegisterAsync(string email, string password, string displayName);
    Task<AppUser> AuthenticateAsync(string email, string password);
    Task<AppUser> GetUserByIdAsync(int id);
    Task UpdateProfileAsync(int userId, string displayName, string? bio, string? avatarUrl);
    
}
