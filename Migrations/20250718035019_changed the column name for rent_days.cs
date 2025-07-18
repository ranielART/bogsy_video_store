using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace bogsy_video_store.Migrations
{
    /// <inheritdoc />
    public partial class changedthecolumnnameforrent_days : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "max_rent_days",
                table: "videos",
                newName: "rent_days");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "rent_days",
                table: "videos",
                newName: "max_rent_days");
        }
    }
}
