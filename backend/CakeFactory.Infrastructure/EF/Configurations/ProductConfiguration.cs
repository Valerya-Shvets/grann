using CakeFactory.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CakeFactory.Infrastructure.EF.Configurations;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasMany(x => x.Options)
            .WithOne(o => o.Product)
            .HasForeignKey("ProductId")
            .OnDelete(DeleteBehavior.Cascade);

        builder.Property(product => product.Components)
            .HasConversion(
                value => string.Join('!', value),
                db => db.Split('!', StringSplitOptions.RemoveEmptyEntries).ToList(),
                new ValueComparer<List<string>>(
                    (c1, c2) => c1.SequenceEqual(c2),
                    c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
                    c => c.ToList()))
            .UsePropertyAccessMode(PropertyAccessMode.Field);

        builder.Ignore(product => product.Decors);
        builder.Ignore(product => product.Types);
        builder.Ignore(product => product.Servings);
    }
}