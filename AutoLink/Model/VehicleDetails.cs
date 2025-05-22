using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoLink.Model
{
    public class VehicleDetails
    {
        public int vehicleID { get; set; }
        public string vehicleRegistration { get; set; } = string.Empty;
        public string vehicleModel { get; set; } = string.Empty;
        public string vehicleBrand { get; set; } = string.Empty;

        public DateTime lastService { get; set; }
        
        public DateTime nextService { get; set; }
 
        public DateTime motDue { get; set; }

        public bool isBookedIn { get; set; }

    }
}
