using Server.Models;
using Server.Repositories;



namespace Server.Handlers;

public class UserHandler : IUserHandler
{
    private readonly IUserRepository _repo;
    public UserHandler(IUserRepository repo) => _repo = repo;

    public async Task<User?> RegisterAsync(string email, string password, string displayName)
    {
        if (await _repo.GetByEmailAsync(email) != null) return null;
        var hash = BCrypt.Net.BCrypt.HashPassword(password);
        var user = new User { Email = email, PasswordHash = hash, DisplayName = displayName };
        return await _repo.CreateAsync(user);                 
    }

    public async Task<User?> AuthenticateAsync(string email, string password)
    {
        var user = await _repo.GetByEmailAsync(email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash)) return null;
        return user;
    }

    public async Task<IEnumerable<User>> GetAllUsersAsync() =>
        await _repo.GetAllAsync();

    public async Task<User?> GetUserByIdAsync(int id) =>
        await _repo.GetByIdAsync(id);

    public async Task<User> CreateUserAsync(User user) =>
        await _repo.CreateAsync(user);

    public async Task UpdateUserAsync(int id, User user)
    {
        if (id != user.Id)
            throw new ArgumentException("ID mismatch");
        await _repo.UpdateAsync(user);
    }

    public async Task DeleteUserAsync(int id)
    {
        var user = await _repo.GetByIdAsync(id);
        if (user == null)
            throw new KeyNotFoundException("User not found");
        await _repo.DeleteAsync(user);
    }

    public async Task<IEnumerable<User>> SearchAsync(string keyword)
    {
        return _repo.Query()
            .Where(u => u.DisplayName.Contains(keyword) || u.Email.Contains(keyword))
            .ToList();
    }

    public async Task UpdateProfileAsync(int userId, string displayName, string? bio, string? avatarUrl)
    {
        var user = await _repo.GetByIdAsync(userId);
        if (user == null) throw new Exception("User not found");
        user.DisplayName = displayName;
        user.Bio = bio;
        user.AvatarUrl = avatarUrl;
        await _repo.UpdateAsync(user);
    }
}
