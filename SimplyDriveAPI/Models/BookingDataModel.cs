using System.ComponentModel.DataAnnotations.Schema;

namespace SimplyDriveAPI.Models
{
    public class BookingDataModel
    {
        [Column("bookingid")]
        public int BookingId { get; set; }

        [Column("userid")]
        public string UserId { get; set; } = string.Empty;

        [Column("vehicleid")]
        public int VehicleId { get; set; }

        [Column("dealerid")]
        public int DealerId { get; set; }

        [Column("bookingdate")]
        public DateTime BookingDate { get; set; }

        [Column("bookingtime")]
        public TimeSpan BookingTime { get; set; }

        [Column("createdat")]
        public DateTime CreatedAt { get; set; }

        [Column("timepaidfor")]
        public int TimePaidFor { get; set; }

        [Column("ismot")]
        public bool IsMot { get; set; }

        [Column("isservice")]
        public bool IsService { get; set; }

        [Column("isdiagnostics")]
        public bool IsDiagnostics { get; set; }

        [Column("isotherjobtype")]
        public bool IsOtherJobType { get; set; }

        [Column("iswarrenty")]
        public bool IsWarrenty { get; set; }

        [Column("dealerreference")]
        public int DealerReference { get; set; }
    }
}


