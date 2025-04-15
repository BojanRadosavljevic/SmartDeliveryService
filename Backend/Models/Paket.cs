using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models{
    public class Paket{
        [Key]
        public Guid id { get; set; }
        [Required]
        [JsonIgnore]
        public List<ArtikalKolicina>? listaArtikala { get; set; }
        [Required]
        public required int cena { get; set; }
        [Required]
        public required string PDFfaktura { get; set; }
        [JsonIgnore]
        [Required]
        public Korisnik korisnik { get; set; }
    }
}