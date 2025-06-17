using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoLink.Model
{
    public class ActiveBookings
    {
        public int bookingId { get; set; }
        public DateTime bookingDate { get; set; }
        public string bookingTime { get; set; }
        public int vehicleId { get; set; }
        public int dealerId { get; set; }
        public bool isService { get; set; }
        public bool isMot { get; set; }
        public bool isDiagnostics { get; set; }
        public bool isOtherJobType { get; set; }
        public bool isWarrenty { get; set; }
        public int dealerReference { get; set; }
    }
}
