using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartDeliveryService.Migrations
{
    /// <inheritdoc />
    public partial class ModelV6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_artikliKolicina_paketi_Paketid",
                table: "artikliKolicina");

            migrationBuilder.DropForeignKey(
                name: "FK_dostave_dostavljaci_dostavljacid",
                table: "dostave");

            migrationBuilder.DropForeignKey(
                name: "FK_dostave_paketi_paketid",
                table: "dostave");

            migrationBuilder.DropForeignKey(
                name: "FK_paketi_korisnici_korisnikid",
                table: "paketi");

            migrationBuilder.AlterColumn<string>(
                name: "username",
                table: "korisnici",
                type: "varchar(255)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "username",
                table: "dostavljaci",
                type: "varchar(255)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_korisnici_username",
                table: "korisnici",
                column: "username",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_dostavljaci_username",
                table: "dostavljaci",
                column: "username",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_artikliKolicina_artikalId",
                table: "artikliKolicina",
                column: "artikalId");

            migrationBuilder.AddForeignKey(
                name: "FK_artikliKolicina_artikli_artikalId",
                table: "artikliKolicina",
                column: "artikalId",
                principalTable: "artikli",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_artikliKolicina_paketi_Paketid",
                table: "artikliKolicina",
                column: "Paketid",
                principalTable: "paketi",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_dostave_dostavljaci_dostavljacid",
                table: "dostave",
                column: "dostavljacid",
                principalTable: "dostavljaci",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_dostave_paketi_paketid",
                table: "dostave",
                column: "paketid",
                principalTable: "paketi",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_paketi_korisnici_korisnikid",
                table: "paketi",
                column: "korisnikid",
                principalTable: "korisnici",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_artikliKolicina_artikli_artikalId",
                table: "artikliKolicina");

            migrationBuilder.DropForeignKey(
                name: "FK_artikliKolicina_paketi_Paketid",
                table: "artikliKolicina");

            migrationBuilder.DropForeignKey(
                name: "FK_dostave_dostavljaci_dostavljacid",
                table: "dostave");

            migrationBuilder.DropForeignKey(
                name: "FK_dostave_paketi_paketid",
                table: "dostave");

            migrationBuilder.DropForeignKey(
                name: "FK_paketi_korisnici_korisnikid",
                table: "paketi");

            migrationBuilder.DropIndex(
                name: "IX_korisnici_username",
                table: "korisnici");

            migrationBuilder.DropIndex(
                name: "IX_dostavljaci_username",
                table: "dostavljaci");

            migrationBuilder.DropIndex(
                name: "IX_artikliKolicina_artikalId",
                table: "artikliKolicina");

            migrationBuilder.AlterColumn<string>(
                name: "username",
                table: "korisnici",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(255)")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "username",
                table: "dostavljaci",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(255)")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddForeignKey(
                name: "FK_artikliKolicina_paketi_Paketid",
                table: "artikliKolicina",
                column: "Paketid",
                principalTable: "paketi",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_dostave_dostavljaci_dostavljacid",
                table: "dostave",
                column: "dostavljacid",
                principalTable: "dostavljaci",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_dostave_paketi_paketid",
                table: "dostave",
                column: "paketid",
                principalTable: "paketi",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_paketi_korisnici_korisnikid",
                table: "paketi",
                column: "korisnikid",
                principalTable: "korisnici",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
