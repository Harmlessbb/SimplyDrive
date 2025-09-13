namespace SimplyDriveAPI.Models
{
    public enum BrandEnum
    {
        testbrand
    }
    public class DealerBrandsModel
    {
        public int dealerid { get; set; }

        public BrandEnum brand {get; set;}
    }
}
