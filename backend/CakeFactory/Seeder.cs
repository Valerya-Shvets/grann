using CakeFactory.Infrastructure.EF;
using CakeFactory.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CakeFactory;

public static class Seeder
{
    public static async void Initialize(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        
        using var roleManager = scope.ServiceProvider.GetService<RoleManager<IdentityRole>>();
        using var userManager = scope.ServiceProvider.GetService<UserManager<IdentityUser>>();
        using var dbContext = scope.ServiceProvider.GetService<AppDbContext>();

        if (dbContext != null) await dbContext.Database.MigrateAsync();
        if (roleManager == null || userManager == null)
        {
            return;
        }

        string[] roles = { IdentityRoles.Admin, IdentityRoles.Chef };
        
        foreach (string role in roles)
        {
            if (!roleManager.Roles.Any(r => r.Name == role))
            {
                await roleManager.CreateAsync(new IdentityRole(role));
            }
        }

        if (await userManager.FindByNameAsync("admin") == null)
        {
            var admin = new IdentityUser()
            {
                UserName = "admin@gmail.com",
                Email = "admin@gmail.com"
            };
            await userManager.CreateAsync(admin, "Admin123");
            await userManager.AddToRoleAsync(admin, IdentityRoles.Admin);
        }
    }
}