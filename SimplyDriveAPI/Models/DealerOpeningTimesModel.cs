namespace SimplyDriveAPI.Models
{
    public class DealerOpeningTimesModel
    {
        public int openinghoursid { get; set; }
        public int dealerid { get; set; }
        public int dayofweek { get; set; }
        public TimeOnly openingtime { get; set; }
        public TimeOnly closingtime { get; set; }
        public int total30minslots { get;set; }
    }
}
