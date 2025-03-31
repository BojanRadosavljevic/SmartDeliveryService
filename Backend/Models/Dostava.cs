using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Enums;

namespace Models{
    public class Dostava{
        [Key]
        public Guid id { get; set; }
        [Required]
        public required Status status { get; set; }
        [Required]
        public required string PNGPotpisa { get; set; }
        [Required]
        [JsonIgnore]
        public Paket? paket { get; set; }
        [Required]
        [JsonIgnore]
        public Dostavljac? dostavljac { get; set; }
        [Required]
        public required TimeOnly vremeDostave { get; set; }
    }
}