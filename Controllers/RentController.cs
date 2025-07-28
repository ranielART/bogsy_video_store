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

            if (video.quantity < dto.rent_quantity)
            {
                return BadRequest(new { status = 404, message = "Not enough video quantity." });
            }

            if(dto.rent_quantity <= 0)
            {
                return BadRequest(new { status = 404, message = "The quantity should be at least 1." });
            }

            if (rentDays > video.rent_days)
            {
                return BadRequest(new { status = 400, message = "The maximum number of days to rent is 3 days." });
            }

            float totalPrice = dto.rent_quantity * (rentDays * video.video_price);

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
                is_returned = false,
                rent_quantity = dto.rent_quantity
            };

            video.quantity -= dto.rent_quantity;
            dbContext.videos.Update(video);
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
            var rentals = await dbContext.rentals
                .Where(r => r.is_returned == false)
                .Include(r => r.customer)
                .Include(r => r.video)
                .Select(r => new
                {
                    rental_id = r.id,
                    rent_date = r.rent_date,
                    return_date = r.return_date,
                    is_returned = r.is_returned,
                    rent_quantity = r.rent_quantity,
                    total_price = r.total_price,
                    customer = new
                    {
                        id = r.customer.id,
                        name = r.customer.first_name + " " + r.customer.last_name,
                    },
                    video = new
                    {
                        id = r.video.id,
                        name = r.video.video_name,
                        quantity = r.video.quantity
                    }
                })
                .ToListAsync();

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
                message = "Unreturned Rentals Retrieved Successfully",
                data = rentals
            });
        }

        [HttpGet("returned-rentals")]
        public async Task<IActionResult> GetAllReturnedRentals()
        {
            var rentals = await dbContext.rentals
                .Where(r => r.is_returned == true)
                .Include(r => r.customer)
                .Include(r => r.video)
                .ToListAsync();

            if (!rentals.Any())
            {
                return NotFound(new
                {
                    status = 404,
                    message = "No Rentals Found."
                });
            }

            var result = rentals.Select(r => new
            {
                rental_id = r.id,
                rent_date = r.rent_date,
                return_date = r.return_date,
                is_returned = r.is_returned,
                rent_quantity = r.rent_quantity,
                date_returned = r.date_returned,
                total_price = r.total_price,
                overdue_days = (r.date_returned - r.return_date).Days,
                overdue_price = r.overdue_price > 0
                    ? ((r.date_returned - r.return_date).Days * r.rent_quantity) * 5 
                    : 0,
                customer = new
                {
                    id = r.customer.id,
                    name = r.customer.first_name + " " + r.customer.last_name
                },
                video = new
                {
                    id = r.video.id,
                    name = r.video.video_name,
                    quantity = r.video.quantity
                }
            });

            return Ok(new
            {
                status = 200,
                message = "Returned Rentals Retrieved Successfully",
                data = result
            });
        }


        [HttpPut("return/{id}")]
        public async Task<IActionResult> ReturnVideo(Guid id, [FromBody] ReturnVideoDto returnVideoDto)
        {
            var rental = await dbContext.rentals
                .Include(r => r.video)
                .FirstOrDefaultAsync(r => r.id == id);

            if (rental == null)
            {
                return NotFound(new
                {
                    status = 404,
                    message = "Rental record not found."
                });
            }

            var video = rental.video;

            

            if (video == null)
            {
                return NotFound(new
                {
                    status = 404,
                    message = "Video record not found."
                });
            }

            if (rental.is_returned)
            {
                return BadRequest(new
                {
                    status = 400,
                    message = "This video has already been returned."
                });
            }

            var expectedReturnDate = rental.return_date;
            var actualReturnDate = returnVideoDto.actual_return_date;
            int overdueDays = (actualReturnDate - expectedReturnDate).Days;
            if (overdueDays > 0)
            {
                rental.overdue_price = overdueDays * 5; 
            }

            rental.is_returned = true;
            rental.date_returned = actualReturnDate;
            video.quantity += rental.rent_quantity;

            dbContext.Update(rental);
            dbContext.Update(video);
            await dbContext.SaveChangesAsync();

            return Ok(new
            {
                status = 200,
                message = "Video returned successfully.",
                overdue_fee = rental.overdue_price,
                overdue_days = overdueDays > 0 ? overdueDays : 0
            });
        }

    }
}
