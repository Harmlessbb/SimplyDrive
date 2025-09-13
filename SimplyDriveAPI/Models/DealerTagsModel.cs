namespace SimplyDriveAPI.Models
{
    public enum DealerTagEnum
    {
        MOT
    }
    public class DealerTagsModel
    {
        public int tagid { get; set; }
        public int dealerid { get; set; }
        public DealerTagEnum tagname { get; set; }
    }
}
