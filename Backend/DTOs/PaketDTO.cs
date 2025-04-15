using Models;

namespace DTOs{
    public class PaketDTO
    {
    public List<ArtikalKolicinaDTO> listaArtikala { get; set; }
    public int cena { get; set; }
    public string PDFfaktura { get; set; }
    public string adresaZaDostavu { get; set; }
    public Guid korisnikId { get; set; }
    }
}