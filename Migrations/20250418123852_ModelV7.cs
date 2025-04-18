using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartDeliveryService.Migrations
{
    /// <inheritdoc />
    public partial class ModelV7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "obavestenja",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    primalacid = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    poruka = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_obavestenja", x => x.id);
                    table.ForeignKey(
                        name: "FK_obavestenja_korisnici_primalacid",
                        column: x => x.primalacid,
                        principalTable: "korisnici",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_obavestenja_primalacid",
                table: "obavestenja",
                column: "primalacid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "obavestenja");
        }
    }
}
