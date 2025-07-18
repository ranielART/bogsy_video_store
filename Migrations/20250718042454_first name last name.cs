using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace bogsy_video_store.Migrations
{
    /// <inheritdoc />
    public partial class firstnamelastname : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "customer_name",
                table: "customers",
                newName: "last_name");

            migrationBuilder.AddColumn<string>(
                name: "first_name",
                table: "customers",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "first_name",
                table: "customers");

            migrationBuilder.RenameColumn(
                name: "last_name",
                table: "customers",
                newName: "customer_name");
        }
    }
}
