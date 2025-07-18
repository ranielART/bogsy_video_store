using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace bogsy_video_store.Migrations
{
    /// <inheritdoc />
    public partial class addedforeignkeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_rentals_customers_customerid",
                table: "rentals");

            migrationBuilder.DropForeignKey(
                name: "FK_rentals_videos_videoid",
                table: "rentals");

            migrationBuilder.DropIndex(
                name: "IX_rentals_customerid",
                table: "rentals");

            migrationBuilder.DropIndex(
                name: "IX_rentals_videoid",
                table: "rentals");

            migrationBuilder.DropColumn(
                name: "customerid",
                table: "rentals");

            migrationBuilder.DropColumn(
                name: "videoid",
                table: "rentals");

            migrationBuilder.CreateIndex(
                name: "IX_rentals_customer_id",
                table: "rentals",
                column: "customer_id");

            migrationBuilder.CreateIndex(
                name: "IX_rentals_video_id",
                table: "rentals",
                column: "video_id");

            migrationBuilder.AddForeignKey(
                name: "FK_rentals_customers_customer_id",
                table: "rentals",
                column: "customer_id",
                principalTable: "customers",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_rentals_videos_video_id",
                table: "rentals",
                column: "video_id",
                principalTable: "videos",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_rentals_customers_customer_id",
                table: "rentals");

            migrationBuilder.DropForeignKey(
                name: "FK_rentals_videos_video_id",
                table: "rentals");

            migrationBuilder.DropIndex(
                name: "IX_rentals_customer_id",
                table: "rentals");

            migrationBuilder.DropIndex(
                name: "IX_rentals_video_id",
                table: "rentals");

            migrationBuilder.AddColumn<Guid>(
                name: "customerid",
                table: "rentals",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.AddColumn<Guid>(
                name: "videoid",
                table: "rentals",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_rentals_customerid",
                table: "rentals",
                column: "customerid");

            migrationBuilder.CreateIndex(
                name: "IX_rentals_videoid",
                table: "rentals",
                column: "videoid");

            migrationBuilder.AddForeignKey(
                name: "FK_rentals_customers_customerid",
                table: "rentals",
                column: "customerid",
                principalTable: "customers",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_rentals_videos_videoid",
                table: "rentals",
                column: "videoid",
                principalTable: "videos",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
