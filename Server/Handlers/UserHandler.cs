using Server.Models;
using Server.Repositories;

namespace Server.Handlers;

public class UserHandler : IUserHandler
{
    private readonly IUserRepository _userRepository;

    public UserHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        return await _userRepository.GetAllAsync();
    }

    public async Task<User?> GetUserByIdAsync(Guid id)
    {
        return await _userRepository.GetByIdAsync(id);
    }

    public async Task<User> CreateUserAsync(User user)
    {
        // 可以在这里添加业务逻辑，比如验证用户数据
        return await _userRepository.CreateAsync(user);
    }

    public async Task UpdateUserAsync(Guid id, User user)
    {
        if (id != user.Id)
        {
            throw new ArgumentException("ID mismatch");
        }

        if (!await _userRepository.ExistsAsync(id))
        {
            throw new KeyNotFoundException("User not found");
        }

        await _userRepository.UpdateAsync(user);
    }

    public async Task DeleteUserAsync(Guid id)
    {
        var user = await _userRepository.GetByIdAsync(id);
        if (user == null)
        {
            throw new KeyNotFoundException("User not found");
        }

        await _userRepository.DeleteAsync(user);
    }
}
