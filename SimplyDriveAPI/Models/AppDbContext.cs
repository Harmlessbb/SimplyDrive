using Microsoft.EntityFrameworkCore;

namespace SimplyDriveAPI.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
        public DbSet<BaysDataModel> BaysDataModel { get; set; }
        public DbSet<BookingDataModel> BookingData { get; set; }
        public DbSet<DealershipDataModel> DealershipData { get; set; }
        public DbSet<VehicleOwnersDataModel> VehicleOwners { get; set; }
        public DbSet<DealerBrandsModel> DealerBrands { get; set; }
        public DbSet<DealerTagsModel> DealerTags { get; set; }
        public DbSet<TechnitianModel> technicianModel { get; set; }
        public DbSet<DealerOpeningTimesModel> openinghours { get; set; }
        public DbSet<JobCodeModel> JobCodes { get; set; }
        public DbSet<QRCodeModel> QRCodeModel { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<BookingDataModel>().ToTable("bookings");
            modelBuilder.Entity<BookingDataModel>().HasKey(b => b.bookingid);

            modelBuilder.Entity<VehicleDataModel>().ToTable("vehicles");
            modelBuilder.Entity<VehicleDataModel>().HasKey(v => v.id);

            //Dealership Models
            modelBuilder.Entity<VehicleOwnersDataModel>().ToTable("vehicleowners");
            modelBuilder.Entity<VehicleOwnersDataModel>().HasKey(u => new { u.userid, u.vehicleid });

            modelBuilder.Entity<DealershipDataModel>().ToTable("dealerdetails");
            modelBuilder.Entity<DealershipDataModel>().HasKey(d => d.dealerid);

            modelBuilder.Entity<DealerTagsModel>().ToTable("dealertags");
            modelBuilder.Entity<DealerTagsModel>().HasKey(t => t.tagid);

            modelBuilder.Entity<DealerReviewStatsModel>().ToTable("dealerreviewstats");
            modelBuilder.Entity<DealerReviewStatsModel>().HasKey(d => d.dealerid);

            modelBuilder.Entity<DealerBrandsModel>().ToTable("dealerbrands");
            modelBuilder.Entity<DealerBrandsModel>().HasKey(d => d.dealerid);

            modelBuilder.Entity<TechnitianModel>().ToTable("technicians");
            modelBuilder.Entity<TechnitianModel>().HasKey(t => t.dealerid);

            modelBuilder.Entity<JobCodeModel>().ToTable("jobcodes");
            modelBuilder.Entity<JobCodeModel>().HasKey(t => t.id);

            modelBuilder.Entity<BaysDataModel>().ToTable("vehiclebays");
            modelBuilder.Entity<BaysDataModel>().HasKey(t => t.dealerid);

            modelBuilder.Entity<QRCodeModel>().ToTable("booking_qrcodes");
            modelBuilder.Entity<QRCodeModel>().HasKey(q => q.qrid);

            modelBuilder.Entity<DealerOpeningTimesModel>()
            .Property(d => d.total30minslots)
            .ValueGeneratedOnAddOrUpdate()   
            .Metadata.SetAfterSaveBehavior(Microsoft.EntityFrameworkCore.Metadata.PropertySaveBehavior.Ignore);
        

            modelBuilder.Entity<DealerOpeningTimesModel>().HasKey(h => h.openinghoursid);

            modelBuilder.HasPostgresEnum<DealerTagEnum>();
            modelBuilder.HasPostgresEnum<TechSkillEnum>();
            modelBuilder.HasPostgresEnum<BrandEnum>();
            modelBuilder.HasPostgresEnum<MakeEnum>();
            modelBuilder.HasPostgresEnum<ModelEnum>();
            modelBuilder.HasPostgresEnum<JobTypeEnum>();
            modelBuilder.HasPostgresEnum<fuelEnum>();

        }
    }
}
