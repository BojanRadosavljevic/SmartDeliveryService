using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartDeliveryService.Migrations
{
    /// <inheritdoc />
    public partial class ModelV5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_artikliKolicina_artikli_artikalid",
                table: "artikliKolicina");

            migrationBuilder.DropIndex(
                name: "IX_artikliKolicina_artikalid",
                table: "artikliKolicina");

            migrationBuilder.RenameColumn(
                name: "artikalid",
                table: "artikliKolicina",
                newName: "artikalId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "artikalId",
                table: "artikliKolicina",
                newName: "artikalid");

            migrationBuilder.CreateIndex(
                name: "IX_artikliKolicina_artikalid",
                table: "artikliKolicina",
                column: "artikalid");

            migrationBuilder.AddForeignKey(
                name: "FK_artikliKolicina_artikli_artikalid",
                table: "artikliKolicina",
                column: "artikalid",
                principalTable: "artikli",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
