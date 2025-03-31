using System.ComponentModel.DataAnnotations;

namespace Models{
    public class Artikal{
        [Key]
        public Guid id { get; set; }
        [Required]
        public required string naziv { get; set; }
        [Required]
        public required string slika { get; set; }
        [Required]
        public required string opis { get; set; }
         [Required]
        public required int cena { get; set; }
    }
}