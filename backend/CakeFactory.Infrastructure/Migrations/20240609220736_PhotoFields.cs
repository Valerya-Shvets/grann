using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CakeFactory.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class PhotoFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Size",
                table: "Photos");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Size",
                table: "Photos",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
