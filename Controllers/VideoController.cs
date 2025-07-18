using bogsy_video_store.Data;
using bogsy_video_store.DTO.VideoDto;
using bogsy_video_store.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bogsy_video_store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public VideoController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        [HttpPost]
        public async Task<IActionResult> AddVideo(AddVideoDto addVideoDto)
        {
            string type = addVideoDto.video_type.ToUpper();

            var videoPrices = new Dictionary<string, int>
            {
                { "VCD", 25 },
                { "DVD", 50 }
            };

            if (!videoPrices.ContainsKey(type))
            {
                return BadRequest(new
                {
                    status = 400,
                    message = "Only VCD and DVD are allowed."
                });
            }

            if (addVideoDto.quantity < 0)
            {
                return BadRequest(new
                {
                    status = 400,
                    message = "Quantity must not be negative."
                });
            }

            var video = new VideoEntity()
            {
                video_name = addVideoDto.video_name,
                video_type = type,
                rent_days = addVideoDto.rent_days,
                video_price = videoPrices[type], 
                quantity = addVideoDto.quantity > 0 ? addVideoDto.quantity : 1,
            };

            dbContext.videos.Add(video);
            await dbContext.SaveChangesAsync();

            return Ok(new
            {
                status = 201,
                message = "Video Added Successfully.",
                data = new
                {
                    id = video.id,
                    video_name = video.video_name,
                    video_type = video.video_type,
                    rent_days = video.rent_days,
                    video_price = video.video_price,
                    quantity = video.quantity,
                }
            });
        }


        [HttpGet("/api/active-videos")]

        public async Task<IActionResult> GetAllVideos()
        {
            var videos = await dbContext.videos.ToListAsync();
            if (videos.Count == 0)
            {
                return NotFound(new
                {
                    status = 404,
                    message = "No Videos Found."
                });
            }
            return Ok(new
            {
                status = 200,
                message = "Videos Retrieved Successfully.",
                data = videos
            });
        }
        
        [HttpGet]
        public async Task<IActionResult> GetAllActiveVideos()
        {
            var videos = await dbContext.videos.Where(v => v.isActive).ToListAsync();
            if (videos.Count == 0)
            {
                return NotFound(new
                {
                    status = 404,
                    message = "No Active Videos Found."
                });
            }
            return Ok(new
            {
                status = 200,
                message = "Active Videos Retrieved Successfully.",
                data = videos
            });
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetVideoById(Guid id)
        {
            var video = await dbContext.videos.FindAsync(id);
            if (video == null)
            {
                return NotFound(new
                {
                    status = 404,
                    message = "Video Not Found."
                });
            }

            return Ok(new
            {
                status = 200,
                message = "Video Retrieved Successfully.",
                data = video
            });
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateVideo(Guid id, AddVideoDto addVideoDto)
        {
            var video = await dbContext.videos.FindAsync(id);
            if (video == null)
            {
                return NotFound(new
                {
                    status = 404,
                    message = "Video Not Found."
                });
            }

            string[] allowedTypes = { "VCD", "DVD" };
            string type = addVideoDto.video_type.ToUpper();

            if (!allowedTypes.Contains(type))
            {
                return BadRequest(new
                {
                    status = 400,
                    message = "Only VCD and DVD are allowed."
                });
            }

            var priceMap = new Dictionary<string, int>
            {
                { "VCD", 25 },
                { "DVD", 50 }
            };

            video.video_name = string.IsNullOrWhiteSpace(addVideoDto.video_name) ? video.video_name : addVideoDto.video_name;
            video.video_type = addVideoDto.video_type;
            video.rent_days = addVideoDto.rent_days;
            video.video_price = priceMap[type];
            video.quantity = addVideoDto.quantity >= 0 ? addVideoDto.quantity : video.quantity;

            dbContext.videos.Update(video);
            await dbContext.SaveChangesAsync();

            return Ok(new
            {
                status = 200,
                message = "Video Updated Successfully.",
                data = new
                {
                    id = video.id,
                    video_name = video.video_name,
                    video_type = video.video_type,
                    rent_days = video.rent_days,
                    video_price = video.video_price,
                    quantity = video.quantity,
                }
            });
        }


        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteVideo(Guid id)
        {
            var video = await dbContext.videos.FindAsync(id);
            if (video == null)
            {
                return NotFound(new
                {
                    status = 404,
                    message = "Video Not Found."
                });
            }
            video.isActive = false;
            dbContext.videos.Update(video);
            await dbContext.SaveChangesAsync();
            return Ok(new
            {
                status = 200,
                message = "Video Deleted Successfully.",
                
            });
        }



    }
}
