using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Handlers;

public class UserHandler : IUserHandler
{
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;

    public UserHandler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    public async Task<AppUser> RegisterAsync(string email, string password, string username)
    {
        //Check if the email address is used already
        if (await _userManager.FindByEmailAsync(email) != null)
            throw new ConflictException("Email already in use.");

        var user = new AppUser { UserName = email, Email = email, DisplayName = username  };
        var result = await _userManager.CreateAsync(user, password); 
        if (!result.Succeeded)
        {
            var errorMsg = string.Join("; ", result.Errors.Select(e => e.Description));
            throw new ConflictException($"Registration failed: {errorMsg}");
        }
        return user;
    }

    public async Task<AppUser> AuthenticateAsync(string email, string password)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
            throw new AuthenticationFailedException("User not found or password incorrect.");

        var result = await _signInManager.CheckPasswordSignInAsync(user, password, false);
        if (!result.Succeeded)
            throw new AuthenticationFailedException("User not found or password incorrect.");

        return user;
    }

    public async Task<AppUser> GetUserByIdAsync(int id)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == id);
        if (user == null)
            throw new NotFoundException("User not found.");
        return user;
    }

    public async Task UpdateProfileAsync(int userId, string displayName, string? bio, string? avatarUrl)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (user == null)
            throw new NotFoundException("User not found.");

        user.DisplayName = displayName;
        user.Bio = bio;
        user.AvatarUrl = avatarUrl;
        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
        {
            var errorMsg = string.Join("; ", result.Errors.Select(e => e.Description));
            throw new ConflictException($"Update failed: {errorMsg}");
        }
    }
}
