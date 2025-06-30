using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoLink.Model
{
    public class ActiveBookingMainPageDTO
    {
        public int BookingId { get; set; }
        public int VehicleId { get; set; }
        public string VehicleRegistration { get; set; } = string.Empty;
        public int DealerId { get; set; }
        public string DealerName { get; set; } = string.Empty;
        public DateOnly BookingDate { get; set; }
        public TimeOnly BookingTime { get; set; }
        public bool IsService { get; set; }
        public bool IsMot { get; set; }
        public bool IsDiagnostics { get; set; }

    }
}