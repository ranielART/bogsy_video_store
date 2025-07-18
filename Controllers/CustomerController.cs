using bogsy_video_store.Data;
using bogsy_video_store.DTO.CustomerDto;
using bogsy_video_store.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using bogsy_video_store.Entities;
using Microsoft.EntityFrameworkCore;

namespace bogsy_video_store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {

        private readonly ApplicationDbContext dbContext;

        public CustomerController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        [HttpPost]
        public async Task<IActionResult> AddCustomer(AddCustomerDto addCustomerDto)
        {
            var customer = new CustomerEntity() { customer_name = addCustomerDto.customer_name};

            dbContext.customers.Add(customer);
            await dbContext.SaveChangesAsync();

            

            return Ok(new
            {
                status = 201,
                message = "Customer Added Successfully.",
                data = customer
            });
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCustomers()
        {   
            var customers = await dbContext.customers.ToListAsync();


            if (customers.Count == 0)
            {
                return NotFound(new
                {
                    status = 404,
                    message = "No Customers Found."
                });
            }

            return Ok(new
            {
                status = 200,
                message = "Customers Retrieved Successfully.",
                data = customers
            });
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetCustomerById(Guid id)
        {
            var customer = await dbContext.customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound(new
                {
                    status = 404,
                    message = "Customer Not Found."
                });
            }

            return Ok(new
            {
                status = 200,
                message = "Customer Retrieved Successfully.",
                data = customer
            });
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateCustomer(Guid id, UpdateCustomerDto updateCustomerDto)
        {
            var customer = await dbContext.customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound(new
                {
                    status = 404,
                    message = "Customer Not Found."
                });
            }

            customer.customer_name = updateCustomerDto.customer_name;
            dbContext.customers.Update(customer);
            await dbContext.SaveChangesAsync();

            return Ok(new
            {
                status = 200,
                message = "Customer Updated Successfully.",
                data = customer
            });
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteCustomer(Guid id)
        {
            var customer = await dbContext.customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound(new
                {
                    status = 404,
                    message = "Customer Not Found."
                });
            }

            dbContext.customers.Remove(customer);
            await dbContext.SaveChangesAsync();

            return Ok(new
            {
                status = 204,
                message = "Customer Deleted Successfully.",
            });
        }


    }
}
