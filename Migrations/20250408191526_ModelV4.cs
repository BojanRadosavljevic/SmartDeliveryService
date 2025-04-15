using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartDeliveryService.Migrations
{
    /// <inheritdoc />
    public partial class ModelV4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_artikli_paketi_Paketid",
                table: "artikli");

            migrationBuilder.DropIndex(
                name: "IX_artikli_Paketid",
                table: "artikli");

            migrationBuilder.DropColumn(
                name: "Paketid",
                table: "artikli");

            migrationBuilder.CreateTable(
                name: "artikliKolicina",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    artikalid = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    kolicina = table.Column<int>(type: "int", nullable: false),
                    Paketid = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_artikliKolicina", x => x.id);
                    table.ForeignKey(
                        name: "FK_artikliKolicina_artikli_artikalid",
                        column: x => x.artikalid,
                        principalTable: "artikli",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_artikliKolicina_paketi_Paketid",
                        column: x => x.Paketid,
                        principalTable: "paketi",
                        principalColumn: "id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_artikliKolicina_artikalid",
                table: "artikliKolicina",
                column: "artikalid");

            migrationBuilder.CreateIndex(
                name: "IX_artikliKolicina_Paketid",
                table: "artikliKolicina",
                column: "Paketid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "artikliKolicina");

            migrationBuilder.AddColumn<Guid>(
                name: "Paketid",
                table: "artikli",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_artikli_Paketid",
                table: "artikli",
                column: "Paketid");

            migrationBuilder.AddForeignKey(
                name: "FK_artikli_paketi_Paketid",
                table: "artikli",
                column: "Paketid",
                principalTable: "paketi",
                principalColumn: "id");
        }
    }
}
