using System.ComponentModel.DataAnnotations;

namespace bogsy_video_store.Entities
{
    public class CustomerEntity
    {
        public Guid id { get; set; }

        [Required(ErrorMessage ="Customer Name is Required!")]
        public string customer_name { get; set; }

        public List<RentalEntity> rentals { get; set; }


    }
}
