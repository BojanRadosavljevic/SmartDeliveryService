using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartDeliveryService.Migrations
{
    /// <inheritdoc />
    public partial class ModelV62 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_paketi_korisnici_korisnikid",
                table: "paketi");

            migrationBuilder.AddForeignKey(
                name: "FK_paketi_korisnici_korisnikid",
                table: "paketi",
                column: "korisnikid",
                principalTable: "korisnici",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_paketi_korisnici_korisnikid",
                table: "paketi");

            migrationBuilder.AddForeignKey(
                name: "FK_paketi_korisnici_korisnikid",
                table: "paketi",
                column: "korisnikid",
                principalTable: "korisnici",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
