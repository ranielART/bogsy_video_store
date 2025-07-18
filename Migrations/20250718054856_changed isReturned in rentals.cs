using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace bogsy_video_store.Migrations
{
    /// <inheritdoc />
    public partial class changedisReturnedinrentals : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isReturned",
                table: "rentals",
                newName: "is_returned");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "is_returned",
                table: "rentals",
                newName: "isReturned");
        }
    }
}
