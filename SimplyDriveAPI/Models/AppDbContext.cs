using Microsoft.EntityFrameworkCore;

namespace SimplyDriveAPI.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<BookingDataModel> BookingData { get; set; }
        public DbSet<DealershipDataModel> DealershipData { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<BookingDataModel>().ToTable("bookingdata");
            modelBuilder.Entity<BookingDataModel>().HasKey(b => b.BookingId);

            modelBuilder.Entity<VehicleDataModel>().ToTable("vehicles");
            modelBuilder.Entity<VehicleDataModel>().HasKey(v => v.id);

            modelBuilder.Entity<DealershipDataModel>().ToTable("dealerships");
            modelBuilder.Entity<DealershipDataModel>().HasKey(d => d.id);

        }
    }
}
