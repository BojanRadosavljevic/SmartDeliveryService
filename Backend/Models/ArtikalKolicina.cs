using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models{
    public class ArtikalKolicina{
         [Key]
        public Guid id { get; set; }        
        [Required]
        public Guid artikalId { get; set; }
        [Required]
        public required int kolicina { get; set; }
    }
}