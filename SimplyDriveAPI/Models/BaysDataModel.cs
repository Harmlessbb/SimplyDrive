using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SimplyDriveAPI.Models
{
    public class BaysDataModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int bayid { get; set; }
        public string bayname { get; set; }

        public int dealerid { get; set; }

        public int? assignedjob { get; set; }

        public int? assignedtechnician { get; set; }
    }
}
