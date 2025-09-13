using System.Globalization;

namespace SimplyDriveAPI.Models
{
    public enum TechSkillEnum
    {
        mot
    }
    public class TechnitianModel
    {
        public int dealerid { get; set; }
        public int technicianid { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public TechSkillEnum[] skills { get; set; }
        public bool isactive { get; set; }

    }
}
