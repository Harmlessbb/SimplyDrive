namespace SimplyDriveAPI.Models
{
    public enum JobTypeEnum
    {
        other,
        repair,
        mot,
        service,
    }
    public enum MakeEnum
    {
        testmake
    }
    public enum ModelEnum
    {
        testmodel
    }
    public enum fuelEnum
    {
        petrol,
        diesel,
        electric
    }
    public class JobCodeModel
    {
        public int id { get; set; }
        public int dealerid { get; set; }
        public string name { get; set; }
        public string description { get; set; }

        public JobTypeEnum type { get; set; }
        public double labourtime { get; set; }
        public double partscost { get; set; }
        public MakeEnum make { get; set; }
        public ModelEnum model { get; set; }
        public int year_start { get; set; }
        public int year_end { get; set; }
        public int mileage_interval { get; set; }
        public string engine { get; set; }
        public fuelEnum fuel { get; set; }
    }
}
