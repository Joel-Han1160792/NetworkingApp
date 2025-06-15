using Microsoft.EntityFrameworkCore;

namespace Server.Models;

public static class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using (var context = new AppDbContext(
                   serviceProvider.GetRequiredService<DbContextOptions<AppDbContext>>()))
        {
            // Look for any users
            if (context.Users.Any())
            {
                return; // DB has been seeded
            }

            context.Users.AddRange(
                new User
                {
                    Email = "john.doe@example.com",
                    DisplayName = "John Doe"
                },
                new User
                {
                    Email = "jane.smith@example.com",
                    DisplayName = "Jane Smith"
                }
            );

            context.SaveChanges();
        }
    }
}
