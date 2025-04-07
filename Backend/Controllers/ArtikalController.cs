using Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Services;

namespace Controllers{
    [ApiController]
    [Route("[controller]")]
    public class ArtikalController: ControllerBase{
        public AppDbContext context { get; set; }

        public ArtikalController(AppDbContext contexta){
            context = contexta;
        }

        [HttpPost]
        [Route("dodajArtikal")]
        public async Task<ActionResult<Artikal>> dodajArtikal(string naziv,string slika,string opis,int cena){
            if(!CheckInfo.ArtikalCheck("naziv",naziv)||!CheckInfo.ArtikalCheck("slika",slika)||!CheckInfo.ArtikalCheck("opis",opis)||!CheckInfo.ArtikalCheck("cena",cena.ToString())){
                return BadRequest("Jednon od polja je prazno");
            }
            var artikal = await context.artikli.Where(x=>x.naziv==naziv).FirstOrDefaultAsync();
            if(artikal != null){
                return BadRequest("Postoji artikal sa tim imenom");
            }
            var noviArtikal = new Artikal{
                id = new Guid(),
                naziv = naziv,
                slika = slika,
                opis = opis,
                cena = cena
            };
            await context.artikli.AddAsync(noviArtikal);
            await context.SaveChangesAsync();

            return Ok(noviArtikal);
        }        
        [HttpGet]
        [Route("vratiSveArtikle")]
        public async Task<ActionResult<List<Artikal>>> vratiSveArtikle(){
            var listaArtikala = await context.artikli.ToListAsync();
            return Ok(listaArtikala);
        }        

    }
}