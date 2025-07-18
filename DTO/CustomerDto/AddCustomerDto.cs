using System.ComponentModel.DataAnnotations;

namespace bogsy_video_store.DTO.CustomerDto
{
    public class AddCustomerDto
    {
        [Required(ErrorMessage = "Customer First Name is Required!")]
        public string first_name { get; set; }

        [Required(ErrorMessage = "Customer Last Name is Required!")]
        public string last_name { get; set; }

    }
}
