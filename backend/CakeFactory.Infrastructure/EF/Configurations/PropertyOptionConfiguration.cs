using CakeFactory.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CakeFactory.Infrastructure.EF.Configurations;

public class PropertyOptionConfiguration : IEntityTypeConfiguration<PropertyOption>
{
    public void Configure(EntityTypeBuilder<PropertyOption> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(po => po.Property)
            .HasConversion<string>();
    }
}