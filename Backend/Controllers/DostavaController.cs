using Data;
using Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Controllers{
    [ApiController]
    [Route("[controller]")]
    public class DostavaController : ControllerBase{
        public AppDbContext context { get; set; }

        public DostavaController(AppDbContext contexta){
            context = contexta;
       }
       [HttpPost]
       [Route("napraviDostavu")]
       public async Task<ActionResult> napraviDostavu(string paketId,string dostavljacId){
            var paketa = await context.paketi.Where(x=>x.id.ToString()==paketId).FirstOrDefaultAsync();
            if(paketa==null){
                return BadRequest("Ne postojeci paket");
            }
            var dostavljaca = await context.dostavljaci.Where(x=>x.id.ToString()==dostavljacId).FirstOrDefaultAsync();
            if(dostavljaca==null){
                return BadRequest("Ne postojeci dostavljac");
            }
            var dost = await context.dostave.Where(x=>x.dostavljac==dostavljaca).FirstOrDefaultAsync();
            if(dost != null){
                return BadRequest("Dostavljac vec ima dostavu");
            }
            var dostava = new Dostava{
                id = Guid.NewGuid(),
                status = Status.Preuzeto,
                PNGPotpisa = "a",
                paket = paketa,
                dostavljac = dostavljaca,
                vremeDostave = TimeOnly.MinValue
            };

            await context.dostave.AddAsync(dostava);
            await context.SaveChangesAsync();

            return Ok(dostava);
       }
       [HttpGet]
       [Route("vratiTrenutnuDostavu")]
       public async Task<ActionResult<Dostava>> vratiTrenutnuDostavu(string idDostavljaca){
            var dostavljac = await context.dostavljaci.Where(x=>x.id.ToString() == idDostavljaca).FirstOrDefaultAsync();
            if(dostavljac == null){
                return BadRequest("ne postoji dostavljac sa tim id-ijem");
            }
            var dostava = await context.dostave.Where(x=>x.dostavljac==dostavljac).Select(d=>new{
                d.id,
                d.status,
                d.PNGPotpisa,
                d.paket.PDFfaktura,
                d.paket.cena,
                idKorisnika = d.paket.korisnik.id,
                d.paket.korisnik.ime,
                d.paket.korisnik.prezime,
                d.paket.korisnik.brojTelefona,
                d.paket.korisnik.adresaZaDostavu,
            }).FirstOrDefaultAsync();
            return Ok(dostava);
       }
       [HttpPost]
       [Route("uploadSlike")]
       public async Task<IActionResult> UploadSlike([FromForm]string id,IFormFile slika){
            var dostava = await context.dostave.Where(x=>x.id.ToString()==id).Include(d => d.paket).FirstOrDefaultAsync();
            if(dostava == null){
                return BadRequest("Ne postoji dostava");
            }
            if(slika == null || slika.Length == 0){
                return BadRequest("Fajl nije validan");
            }
            var folder = Path.Combine(Directory.GetCurrentDirectory(),"Backend","Images","Fakture");
            
            if(!Directory.Exists(folder)){
                Directory.CreateDirectory(folder);
            }

            var filename = Guid.NewGuid().ToString()+Path.GetExtension(slika.FileName);
            if(dostava.paket==null){
                return BadRequest("Greska pri preuzimanju paketa");
            }
            dostava.paket.PDFfaktura = filename;
            context.dostave.Update(dostava);
            await context.SaveChangesAsync();
            var fullPath = Path.Combine(folder, filename);
            using(var stream = new FileStream(fullPath,FileMode.Create)){
                    await slika.CopyToAsync(stream);
            }


            var url = $"/Images/Fakture/{filename}";

            return Ok(url);

       }
       [HttpDelete]
       [Route("otkaziDostavu")]
       public async Task<ActionResult<List<Paket>>> otkaziDostavu(string idDostave){
            var dostava = await context.dostave.Where(x=>x.id.ToString()==idDostave).FirstOrDefaultAsync();
            if(dostava == null){
                return BadRequest("Zelite obrisati nepostojecu dostavu");
            }
           context.dostave.Remove(dostava);
           await context.SaveChangesAsync();
           return Ok("Uspesno izbrisana dostava");
       }
        [HttpPut]
        [Route("izvrsiDostavu")]
        public async Task<ActionResult<Dostava>> izvrsiDostavu(string idDostave){
            var dostava = await context.dostave.Where(x=>x.id.ToString()==idDostave).FirstOrDefaultAsync();
             if(dostava == null){
                return BadRequest("Zelite obrisati nepostojecu dostavu");
            }
            dostava.status = Status.Dostavljeno;
            context.dostave.Update(dostava);
            await context.SaveChangesAsync();
            return Ok(dostava);
        }
        [HttpGet]
        [Route("vratiDostaveKorisnika")]
        public async Task<ActionResult<List<Dostava>>> vratiDostaveKorisnika(string idKorisnika){
            var korisnik = await context.korisnici.Where(x=>x.id.ToString()==idKorisnika).FirstOrDefaultAsync();
            if(korisnik==null){
                return BadRequest("Ne postojeci korisnik");
            }
            var listaDostava = await context.dostave.Where(x=>x.paket.korisnik==korisnik).OrderBy(x=>x.vremeDostave).Select(d=>new{
                d.id,
                d.status,
                d.PNGPotpisa,
                d.paket.PDFfaktura,
                d.paket.cena,
                idKorisnika = d.paket.korisnik.id,
                d.paket.korisnik.ime,
                d.paket.korisnik.prezime,
                d.paket.korisnik.brojTelefona,
                d.paket.korisnik.adresaZaDostavu,
            }).ToListAsync();
            return Ok(listaDostava);

        }
    }
}