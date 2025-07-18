using System.ComponentModel.DataAnnotations;

namespace bogsy_video_store.DTO.CustomerDto
{
    public class AddCustomerDto
    {
        [Required]
        public string customer_name { get; set; } 

    }
}
