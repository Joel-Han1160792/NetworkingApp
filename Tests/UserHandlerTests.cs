namespace Tests;

using Xunit;
using Moq;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using Server.Models;
using Server.Handlers;
using System.Collections.Generic;
using System.Linq;

public class UserHandlerTests
{
    [Fact]
    public async Task RegisterAsync_EmailAlreadyExists_ThrowsConflictException()
    {
        // Arrange
        var userManagerMock = MockUserManager();
        userManagerMock.Setup(m => m.FindByEmailAsync("test@example.com"))
            .ReturnsAsync(new AppUser());

        var signInManagerMock = MockSignInManager(userManagerMock.Object);

        var handler = new UserHandler(userManagerMock.Object, signInManagerMock.Object);

        // Act & Assert
        await Assert.ThrowsAsync<ConflictException>(() =>
            handler.RegisterAsync("test@example.com", "password", "TestUser"));
    }

    [Fact]
    public async Task RegisterAsync_CreateFailed_ThrowsConflictException()
    {
        // Arrange
        var userManagerMock = MockUserManager();
        userManagerMock.Setup(m => m.FindByEmailAsync(It.IsAny<string>()))
            .ReturnsAsync((AppUser)null);
        userManagerMock.Setup(m => m.CreateAsync(It.IsAny<AppUser>(), It.IsAny<string>()))
            .ReturnsAsync(IdentityResult.Failed(new IdentityError { Description = "Some error" }));

        var signInManagerMock = MockSignInManager(userManagerMock.Object);

        var handler = new UserHandler(userManagerMock.Object, signInManagerMock.Object);

        // Act & Assert
        await Assert.ThrowsAsync<ConflictException>(() =>
            handler.RegisterAsync("test2@example.com", "password", "TestUser"));
    }

    [Fact]
    public async Task RegisterAsync_Success_ReturnsUser()
    {
        // Arrange
        var userManagerMock = MockUserManager();
        userManagerMock.Setup(m => m.FindByEmailAsync(It.IsAny<string>()))
            .ReturnsAsync((AppUser)null);
        userManagerMock.Setup(m => m.CreateAsync(It.IsAny<AppUser>(), It.IsAny<string>()))
            .ReturnsAsync(IdentityResult.Success);

        var signInManagerMock = MockSignInManager(userManagerMock.Object);

        var handler = new UserHandler(userManagerMock.Object, signInManagerMock.Object);

        // Act
        var user = await handler.RegisterAsync("test3@example.com", "password", "TestUser");

        // Assert
        Assert.NotNull(user);
        Assert.Equal("test3@example.com", user.Email);
        Assert.Equal("TestUser", user.DisplayName);
    }

    [Fact]
    public async Task AuthenticateAsync_UserNotFound_ThrowsAuthException()
    {
        // Arrange
        var userManagerMock = MockUserManager();
        userManagerMock.Setup(m => m.FindByEmailAsync(It.IsAny<string>()))
            .ReturnsAsync((AppUser)null);

        var signInManagerMock = MockSignInManager(userManagerMock.Object);

        var handler = new UserHandler(userManagerMock.Object, signInManagerMock.Object);

        // Act & Assert
        await Assert.ThrowsAsync<AuthenticationFailedException>(() =>
            handler.AuthenticateAsync("notfound@example.com", "pwd"));
    }

    [Fact]
    public async Task AuthenticateAsync_WrongPassword_ThrowsAuthException()
    {
        // Arrange
        var userManagerMock = MockUserManager();
        userManagerMock.Setup(m => m.FindByEmailAsync(It.IsAny<string>()))
            .ReturnsAsync(new AppUser());

        var signInManagerMock = MockSignInManager(userManagerMock.Object);
        signInManagerMock.Setup(m => m.CheckPasswordSignInAsync(It.IsAny<AppUser>(), It.IsAny<string>(), false))
            .ReturnsAsync(SignInResult.Failed);

        var handler = new UserHandler(userManagerMock.Object, signInManagerMock.Object);

        // Act & Assert
        await Assert.ThrowsAsync<AuthenticationFailedException>(() =>
            handler.AuthenticateAsync("user@example.com", "wrongpwd"));
    }

    [Fact]
    public async Task AuthenticateAsync_Success_ReturnsUser()
    {
        // Arrange
        var userManagerMock = MockUserManager();
        var testUser = new AppUser { Email = "auth@example.com", DisplayName = "Test" };
        userManagerMock.Setup(m => m.FindByEmailAsync(It.IsAny<string>()))
            .ReturnsAsync(testUser);

        var signInManagerMock = MockSignInManager(userManagerMock.Object);
        signInManagerMock.Setup(m => m.CheckPasswordSignInAsync(It.IsAny<AppUser>(), It.IsAny<string>(), false))
            .ReturnsAsync(SignInResult.Success);

        var handler = new UserHandler(userManagerMock.Object, signInManagerMock.Object);

        // Act
        var user = await handler.AuthenticateAsync("auth@example.com", "password");

        // Assert
        Assert.NotNull(user);
        Assert.Equal("auth@example.com", user.Email);
    }

    // ---- Mock helpers ----

    private Mock<UserManager<AppUser>> MockUserManager()
    {
        var store = new Mock<IUserStore<AppUser>>();
        return new Mock<UserManager<AppUser>>(
            store.Object, null, null, null, null, null, null, null, null);
    }

    private Mock<SignInManager<AppUser>> MockSignInManager(UserManager<AppUser> userManager)
    {
        var contextAccessor = new Mock<Microsoft.AspNetCore.Http.IHttpContextAccessor>();
        var claimsFactory = new Mock<IUserClaimsPrincipalFactory<AppUser>>();
        return new Mock<SignInManager<AppUser>>(
            userManager, contextAccessor.Object, claimsFactory.Object, null, null, null, null);
    }
}
