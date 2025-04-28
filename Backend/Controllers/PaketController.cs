using Data;
using DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Controllers{
    [ApiController]
    [Route("[controller]")]
    public class PaketController:ControllerBase{
        public AppDbContext context { get; set; }

        public PaketController(AppDbContext contexta){
            context = contexta;
        }
        [HttpPost]
        [Route("dodajPaket")]
        public async Task<ActionResult<Paket>> dodajPaket(PaketDTO paket){
            var user = await context.korisnici.Where(x=>x.id==paket.korisnikId).FirstOrDefaultAsync();
            if(user==null){
                return BadRequest("ne postoji user");
            }
            var nPaket = new Paket{
                id = Guid.NewGuid(),
                cena = paket.cena,
                PDFfaktura = paket.PDFfaktura,
                korisnik = user,
                listaArtikala = paket.listaArtikala.Select(a => new ArtikalKolicina{
                    id= Guid.NewGuid(),
                    artikalId = a.artikal.id,
                    kolicina = a.brojArtikala
                }
                ).ToList()
            };
            user.adresaZaDostavu =paket.adresaZaDostavu;
            context.korisnici.Update(user);
            foreach(ArtikalKolicina la in nPaket.listaArtikala){
                await context.artikliKolicina.AddAsync(la);
            }
            await context.paketi.AddAsync(nPaket);
            await context.SaveChangesAsync();
            return Ok(nPaket);
        }
        [HttpGet]
        [Route("vratiPaketeBezDostave")]
        public async Task<ActionResult<Paket>> vratiPaketeBezDostave(){
            var paketiSaDostavom = await context.dostave.Where(d=>d.paket!=null).Select(d=>d.paket.id).ToListAsync();
            var paketiBezDostave = await context.paketi.Where(p => !paketiSaDostavom.Contains(p.id)).Select(p=>new{
                p.id,
                p.cena,
                p.PDFfaktura,
                idKorisnika = p.korisnik.id,
                p.korisnik.ime,
                p.korisnik.prezime,
                p.korisnik.brojTelefona,
                p.korisnik.adresaZaDostavu}).ToListAsync();
            return Ok(paketiBezDostave);
        }
        [HttpGet]
        [Route("vratiPaketeBezDostaveUsera")]
        public async Task<ActionResult<Paket>> vratiPaketeBezDostaveUsera(string idKorisnika){
            var paketiSaDostavom = await context.dostave.Where(d=>d.paket!=null && d.paket.korisnik.id.ToString()==idKorisnika).Select(d=>d.paket.id).ToListAsync();
            var paketiBezDostave = await context.paketi.Where(p => !paketiSaDostavom.Contains(p.id)).Select(p=>new{
                p.id,
                p.cena,
                p.PDFfaktura,
                idKorisnika = p.korisnik.id,
                p.korisnik.ime,
                p.korisnik.prezime,
                p.korisnik.brojTelefona,
                p.korisnik.adresaZaDostavu}).ToListAsync();
            return Ok(paketiBezDostave);
        }
    }
}