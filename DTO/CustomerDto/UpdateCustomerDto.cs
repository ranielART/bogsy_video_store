using System.ComponentModel.DataAnnotations;

namespace bogsy_video_store.DTO.CustomerDto
{
    public class UpdateCustomerDto
    {
        [Required]
        public string customer_name { get; set; }
    }
}
