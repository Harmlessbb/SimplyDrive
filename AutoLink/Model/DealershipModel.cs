using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SimplyDrive.Model
{
    public class DealershipModel
    {
        public int id { get; set; }
        public string dealername { get; set; }
        public string dealeraddress { get; set; }
        public string dealerpostcode { get; set; }
        public double dealerlatitude { get; set; }
        public double dealerlongitude { get; set; }
        public int dealerservicestable { get; set; }
        public int dealerbrandstable { get; set; }
        public int dealeravailabilitytable { get; set; }
        public double dealerrating { get; set; }
        public double baselabourrate { get; set; }
        public int baseavailablehours { get; set; }
        public string openingdays { get; set; }
        public string openingtimes { get; set; }
        public string dropofftimesam { get; set; }
        public string dropofftimespm { get; set; }
        public bool ismaindealer { get; set; }
        public bool haswaitingfacilities { get; set; }
        public bool hastaxiservice { get; set; }
    }
}
