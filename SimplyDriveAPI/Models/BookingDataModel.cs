using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SimplyDriveAPI.Models
{
    public enum BookingStatusEnum
    {
        upcoming,
        awaitingcheckin,
        onsite,
        awaitingparts,
        inworkshop,
        awaitingauthorisation,
        awaitingwarrantyresponse,
        completed,
    }
    public class BookingDataModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int bookingid { get; set; }
        public string userid { get; set; }
        public int dealerid { get; set; }
        public int vehicleid { get; set; }

        [Column(TypeName = "timestamp without time zone")]
        public DateTime date { get; set; }
        public TimeSpan time { get; set; }
        public int timeslot { get; set; }
        public int[] jobcodes { get; set; }
        public double totallabour { get; set; }
        public BookingStatusEnum status { get; set; }
        public string reference { get; set; }

    }
}


