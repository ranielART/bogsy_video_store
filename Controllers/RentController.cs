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
                return NotFound(new { status = 404, message = "Customer or video not found." });

            var rentDays = (dto.return_date - dto.rent_date).Days;
            if (rentDays <= 0)
                return BadRequest(new { status = 404, message = "Return date must be after rent date." });

            if (rentDays > video.rent_days)
            {
                return BadRequest(new { status = 400, message = "The maximum number of days to rent is 3 days." });
            }

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
                    total_price = rental.total_price,
                    rent_date = rental.rent_date,
                    return_date = rental.return_date,
                    rent_days = rental.rent_days,   

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

        [HttpGet("unreturned-rentals")]
        public async Task<IActionResult> GetAllUnreturnedRentals()
        {

            var rentals = await dbContext.rentals.Where(r => r.is_returned == false).ToListAsync();
            if (rentals.Count == 0)
            {
                return NotFound(new
                {
                    status = 404,
                    message = "No Rentals Found."
                });
            }

            return Ok(new
            {
                status = 200,
                message = "Rentals Retrieved Successfully",
                data = rentals
            });
        }

        [HttpPut("return/{id}")]
        public async Task<IActionResult> ReturnVideo(Guid id, DateTime actual_return_date)
        {
            var rental = await dbContext.rentals
                .Include(r => r.video)
                .FirstOrDefaultAsync(r => r.id == id);

            if (rental == null)
                return NotFound( new { status = 404,
                    message = "Rental record not found." });

            var expectedReturnDate = rental.return_date;
            var actualReturnDate = actual_return_date;

            int overdueDays = (actualReturnDate - expectedReturnDate).Days;
            if (overdueDays > 0)
            {
                rental.overdue_price = overdueDays * 5;


            }
            rental.is_returned = true;

            dbContext.Update(rental);
            await dbContext.SaveChangesAsync();

            return Ok(new
            {
                message = "Video returned successfully.",
                overdue_fee = rental.overdue_price,
                overdue_days = overdueDays
            });
        }

    }
}
