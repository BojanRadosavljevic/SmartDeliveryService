using System.ComponentModel.DataAnnotations;

namespace Models{
    public class Dostavljac{
        [Key]
        public Guid id { get; set; }
        [Required]
        public required string ime { get; set; }
        [Required]
        public required string prezime { get; set; }
        [Required]
        [RegularExpression(@"^\+?[0-9][0-9\s.-]{7,11}$")]
        public required string brojTelefona { get; set; }
        [Required]
        public required string username { get; set; }
        [Required]
        public required string password { get; set; }
    }
}