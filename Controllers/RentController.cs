using bogsy_video_store.Data;
using bogsy_video_store.DTO.RentDto;
using bogsy_video_store.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bogsy_video_store.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RentController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public RentController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost("rent-video")]
        public async Task<IActionResult> RentVideo(RentVideoDto dto)
        {
            var customer = await dbContext.customers.FindAsync(dto.customer_id);
            var video = await dbContext.videos.FindAsync(dto.video_id);

            if (customer == null || video == null)
                return NotFound("Customer or video not found.");

            var rentDays = (dto.return_date - dto.rent_date).Days;
            if (rentDays <= 0)
                return BadRequest("Return date must be after rent date.");

            float totalPrice = rentDays * video.video_price;

            var rental = new RentalEntity
            {
                id = Guid.NewGuid(),
                rent_date = dto.rent_date,
                return_date = dto.return_date,
                rent_days = rentDays,
                total_price = totalPrice,
                overdue_price = 0,
                customer_id = dto.customer_id,
                video_id = dto.video_id,
                customer = customer,
                video = video,
                is_returned = false
            };

            dbContext.rentals.Add(rental);
            await dbContext.SaveChangesAsync();

            return Ok(new
            {   
                status = 200,
                message = "Video rented successfully.",
                
                data = new
                {
                    rental_id = rental.id,
                    customer_id = rental.customer_id,
                    video_id = rental.video_id,
                    total_price = rental.total_price


                }
            });
        }

        [HttpGet]
        public async Task<IActionResult> GetAllRentals()
        {

            var rentals = await dbContext.rentals.ToListAsync();
            if(rentals.Count == 0)
            {
                return NotFound(new
                {
                    status = 404, 
                    message = "No Rentals Found."
                });
            }



            return Ok(new {
                status = 200, 
                message = "Rentals Retrieved Successfully",
                data = rentals
            });
        }

        
    }
}
