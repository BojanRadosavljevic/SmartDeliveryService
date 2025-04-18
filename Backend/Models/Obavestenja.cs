using System.ComponentModel.DataAnnotations;

namespace Models{
    public class Obavestenja{    
        [Key]
        public Guid id { get; set; }
        [Required]
        public Korisnik primalac { get; set; }
        [Required]
        public required string poruka { get; set; }
        [Required]
        public required DateTime vremePoruke { get; set; }
        [Required]
        public required bool procitana { get; set; }
        
    }
}