using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartDeliveryService.Migrations
{
    /// <inheritdoc />
    public partial class ModelV71 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "vremePoruke",
                table: "obavestenja",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "vremePoruke",
                table: "obavestenja");
        }
    }
}
