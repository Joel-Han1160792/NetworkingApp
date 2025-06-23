using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Handlers;
using Server.DTOs;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserHandler _userHandler;

    public UsersController(IUserHandler userHandler)
    {
        _userHandler = userHandler;
    }

    // Register
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        try
        {
            var user = await _userHandler.RegisterAsync(dto.Email, dto.Password, dto.DisplayName);
            //NOT RETURN Password
            return Ok(new { user.Id, user.Email, user.DisplayName });
        }
        catch (ConflictException ex)
        {
            return Conflict(new { error = ex.Message }); // 409
        }
    }

    // Login
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        try
        {
            var user = await _userHandler.AuthenticateAsync(dto.Email, dto.Password);
            // Return JWT Token
            return Ok(new { user.Id, user.Email, user.DisplayName });
        }
        catch (AuthenticationFailedException ex)
        {
            return Unauthorized(new { error = ex.Message }); // 401
        }
    }

    // Search User
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(int id)
    {
        try
        {
            var user = await _userHandler.GetUserByIdAsync(id);
            return Ok(new { user.Id, user.Email, user.DisplayName, user.Bio, user.AvatarUrl });
        }
        catch (NotFoundException ex)
        {
            return NotFound(new { error = ex.Message });
        }
    }

    // Update Profile
    [HttpPut("{id}/profile")]
    public async Task<IActionResult> UpdateProfile(int id, [FromBody] UpdateProfileDto dto)
    {
        try
        {
            await _userHandler.UpdateProfileAsync(id, dto.DisplayName, dto.Bio, dto.AvatarUrl);
            return Ok();
        }
        catch (NotFoundException ex)
        {
            return NotFound(new { error = ex.Message });
        }
        catch (ConflictException ex)
        {
            return Conflict(new { error = ex.Message });
        }
    }
}
