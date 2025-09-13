using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SimplyDrive.Model
{
    public class VehicleModel
    {
        public int id { get; set; }
        public string registration { get; set; } = string.Empty;
        public string vin { get; set; } = string.Empty;
        public string make { get; set; } = string.Empty;
        public string model { get; set; } = string.Empty;
        public int year_of_manufacture { get; set; } = 0;
        public int mileage { get; set; } = 0;
        public string colour { get; set; } = string.Empty;
        public string fuel_type { get; set; } = string.Empty;
        public string body_type { get; set; } = string.Empty;
        public string transmission { get; set; } = string.Empty;
        public int engine_cc { get; set; } = 0;
        public DateOnly last_service_date { get; set; }
        public DateOnly next_service_date { get; set; }
        public DateOnly mot_due_date { get; set; }

    }
}
