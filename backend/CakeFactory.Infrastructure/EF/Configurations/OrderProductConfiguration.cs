using CakeFactory.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CakeFactory.Infrastructure.EF.Configurations;

public class OrderProductConfiguration : IEntityTypeConfiguration<OrderProduct>
{
    public void Configure(EntityTypeBuilder<OrderProduct> builder)
    {
        builder.HasOne(op => op.Product)
            .WithMany("_orders")
            .HasForeignKey(x => x.ProductId)
            .OnDelete(DeleteBehavior.SetNull);
        
        builder.HasOne(op => op.Chef)
            .WithMany()
            .HasForeignKey(x => x.ChefId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.OwnsOne(op => op.Type);
        builder.OwnsOne(op => op.Decor);
        builder.OwnsOne(op => op.Serving);
        
        builder.Property(product => product.Components)
            .HasConversion(
                value => string.Join('!', value),
                db => db.Split('!', StringSplitOptions.RemoveEmptyEntries).ToList(),
                new ValueComparer<List<string>>(
                    (c1, c2) => c1.SequenceEqual(c2),
                    c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
                    c => c.ToList()));
    }
}