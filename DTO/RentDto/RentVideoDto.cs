using bogsy_video_store.Entities;
using System.ComponentModel.DataAnnotations;

namespace bogsy_video_store.DTO.RentDto
{
    public class RentVideoDto
    {
        [Required]
        public Guid customer_id { get; set; }

        [Required]
        public Guid video_id { get; set; }

        //[Required]
        public int rent_quantity { get; set; }

        [Required]
        public DateTime rent_date { get; set; }

        [Required]
        public DateTime return_date { get; set; }

    }
}
