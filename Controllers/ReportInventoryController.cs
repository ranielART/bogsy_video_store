using bogsy_video_store.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bogsy_video_store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportInventoryController : ControllerBase
    {

        private readonly ApplicationDbContext dbContext;
        public ReportInventoryController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("video-inventory")]
        public async Task<IActionResult> GetVideoInventoryReport()
        {
            var report = await dbContext.videos
                .Select(video => new
                {
                    video.id,
                    video.video_name,
                    video.quantity,

                    rented_quantity = dbContext.rentals
                        .Where(r => r.video_id == video.id && !r.is_returned)
                        .Count()
                }).ToListAsync();

            return Ok
                (new
                {
                    status = 200,
                    message = "Video Inventory Report Retrieved Successfully.",
                    data = report
                });


        }
    }
}
