using bogsy_video_store.Entities;
using Microsoft.EntityFrameworkCore;

namespace bogsy_video_store.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {    
        }

        public DbSet<CustomerEntity> customers { get; set; }
        public DbSet<RentalEntity> rentals { get; set; }
        public DbSet<VideoEntity> videos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<RentalEntity>()
                .HasOne(r => r.customer)
                .WithMany(c => c.rentals)
                .HasForeignKey(r => r.customer_id)
                .OnDelete(DeleteBehavior.Cascade);

            
            modelBuilder.Entity<RentalEntity>()
                .HasOne(r => r.video)
                .WithMany(v => v.rentals)
                .HasForeignKey(r => r.video_id)
                .OnDelete(DeleteBehavior.Cascade);
        }

    }
    
}
