using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CakeFactory.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ForeignKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderProduct_Products_ProductId1",
                table: "OrderProduct");

            migrationBuilder.DropIndex(
                name: "IX_OrderProduct_ProductId1",
                table: "OrderProduct");

            migrationBuilder.DropColumn(
                name: "ProductId1",
                table: "OrderProduct");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderProduct_Products_ProductId",
                table: "OrderProduct",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderProduct_Products_ProductId",
                table: "OrderProduct");

            migrationBuilder.AddColumn<int>(
                name: "ProductId1",
                table: "OrderProduct",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderProduct_ProductId1",
                table: "OrderProduct",
                column: "ProductId1",
                unique: true,
                filter: "[ProductId1] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderProduct_Products_ProductId1",
                table: "OrderProduct",
                column: "ProductId1",
                principalTable: "Products",
                principalColumn: "Id");
        }
    }
}
