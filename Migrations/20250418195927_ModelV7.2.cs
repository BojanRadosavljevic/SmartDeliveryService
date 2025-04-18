using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartDeliveryService.Migrations
{
    /// <inheritdoc />
    public partial class ModelV72 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "procitana",
                table: "obavestenja",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "procitana",
                table: "obavestenja");
        }
    }
}
