using CakeFactory.Core.Entities;
using CakeFactory.Infrastructure.EF.Configurations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CakeFactory.Infrastructure.EF;

public class AppDbContext : IdentityDbContext
{
    public DbSet<Product> Products { get; set; }
    public DbSet<PropertyOption> Options { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Chef> Chefs { get; set; }
    public DbSet<Photo> Photos { get; set; }
    public DbSet<OrderProduct> OrderProducts { get; set; }
    
    public AppDbContext(DbContextOptions options) : base(options) {}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new ProductConfiguration());
        modelBuilder.ApplyConfiguration(new OrderConfiguration());
        modelBuilder.ApplyConfiguration(new OrderProductConfiguration());
        modelBuilder.ApplyConfiguration(new PropertyOptionConfiguration());
        base.OnModelCreating(modelBuilder);
    }
}