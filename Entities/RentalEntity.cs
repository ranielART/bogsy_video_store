using System.ComponentModel.DataAnnotations;

namespace bogsy_video_store.Entities
{
    public class RentalEntity
    {
        public Guid id { get; set; }

        [Required]
        public DateTime rent_date { get; set; }

        [Required]
        public DateTime return_date { get; set; }

        



        [Required]
        public Guid customer_id { get; set; }
        public CustomerEntity customer { get; set; }

        [Required]
        public Guid video_id { get; set; }
        public VideoEntity video { get; set; }
           
         

        public int rent_quantity { get; set; }

        public int rent_days { get; set; }

        public float total_price { get; set; }

        public float overdue_price { get; set; }

        [Required]
        public Boolean is_returned { get; set; } = false;

    }
}
