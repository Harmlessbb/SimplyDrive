namespace SimplyDriveAPI.Models
{
    public class QRCodeModel
    {
        public int qrid { get; set; }
        public string userid { get; set; }
        public int bookingid { get; set; }
        public string passcode { get; set; }
        public string qr_string { get; set; }
        public DateTime date_created { get; set; }
        public DateTime date_expires { get; set; }
        public bool active { get; set; }

    }

}
