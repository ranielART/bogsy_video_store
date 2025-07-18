using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace bogsy_video_store.Migrations
{
    /// <inheritdoc />
    public partial class addedisActiveandquantitycolumnsinvideostable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isActive",
                table: "videos",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "quantity",
                table: "videos",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isActive",
                table: "videos");

            migrationBuilder.DropColumn(
                name: "quantity",
                table: "videos");
        }
    }
}
