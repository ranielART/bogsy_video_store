using System.ComponentModel.DataAnnotations;

namespace bogsy_video_store.Entities
{
    public class CustomerEntity
    {
        public Guid id { get; set; }

        [Required(ErrorMessage ="Customer First Name is Required!")]
        public string first_name { get; set; }

        [Required(ErrorMessage ="Customer Last Name is Required!")]
        public string last_name { get; set; }

        public List<RentalEntity> rentals { get; set; }


    }
}
