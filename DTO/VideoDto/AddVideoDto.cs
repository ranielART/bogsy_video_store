using System.ComponentModel.DataAnnotations;

namespace bogsy_video_store.DTO.VideoDto
{
    public class AddVideoDto
    {
        

        [Required(ErrorMessage = "Video Name is Required!")]
        public string video_name { get; set; }

        [Required(ErrorMessage = "Video Type is Required!")]
        public string video_type { get; set; }

        [Required(ErrorMessage = "Video Description is Required!")]
        [Range(1, 3, ErrorMessage = "Rental duration must be from 1 to 3 days")]
        public int rent_days { get; set; }

        public int quantity { get; set; }


        [Required(ErrorMessage = "Video Price is Required!")]
        public float video_price { get; set; }
    }
}
