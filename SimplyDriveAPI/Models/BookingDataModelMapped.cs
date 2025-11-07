using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SimplyDriveAPI.Models;

namespace SimplyDriveAPI.Models
{

    public class BookingDataModelMapped
    {
        [Key]
        public int bookingid { get; set; } 
        public string userid { get; set; }
        public int dealerid { get; set; }
        public string registration { get; set; }
        public DateTime date { get; set; }
        public TimeSpan time { get; set; }
        public int timeslot { get; set; }
        public int[] jobcodes { get; set; }
        public double totallabour { get; set; }
        public BookingStatusEnum status { get; set; }
        public string reference { get; set; }

    }
}


