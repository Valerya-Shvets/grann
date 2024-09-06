using CakeFactory.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CakeFactory.Infrastructure.EF.Configurations;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.OwnsOne(order => order.ClientInfo);
        builder.OwnsOne(order => order.DeliveryInfo);
        builder.OwnsOne(order => order.PaymentInfo);
        builder.HasMany(order => order.Products)
            .WithOne(product => product.Order)
            .HasForeignKey(product => product.OrderId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}