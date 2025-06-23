using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Handlers;
using Server.DTOs;
using Microsoft.AspNetCore.Authorization;
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserHandler _userHandler;
    private readonly IJwtService _jwtService;
    public UsersController(IUserHandler userHandler, IJwtService jwtService)
    {
        _userHandler = userHandler;
        _jwtService = jwtService;
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
            var token = _jwtService.GenerateToken(user);
            return Ok(new { token });
           
        }
        catch (AuthenticationFailedException ex)
        {
            return Unauthorized(new { error = ex.Message }); // 401
        }
    }

    // Get User Profile
[Authorize]
[HttpGet("profile")]
public async Task<IActionResult> GetProfile()
{
    var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier) 
                   ?? User.FindFirst(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Sub);

    if (userIdClaim == null)
        return Unauthorized(new { error = "Invalid token: missing user id." });

    if (!int.TryParse(userIdClaim.Value, out int userId))
        return Unauthorized(new { error = "Invalid user id format in token." });

    var user = await _userHandler.GetUserByIdAsync(userId);
    if (user == null)
        return NotFound(new { error = "User not found." });

    // Use UserProfileDto for response
    var profile = new UserProfileDto
    {
        Id = user.Id,
        Email = user.Email ?? "",
        DisplayName = user.DisplayName ?? "",
        Bio = user.Bio,
        AvatarUrl = user.AvatarUrl
    };

    return Ok(profile);
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
