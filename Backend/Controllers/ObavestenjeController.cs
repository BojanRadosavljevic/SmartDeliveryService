using Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Controllers{
    [ApiController]
    [Route("[controller]")]
    public class ObavestenjeController:ControllerBase{
        public AppDbContext context { get; set; }

        public ObavestenjeController(AppDbContext contexta){
            context = contexta;
        }

        [HttpPost]
        [Route("postaviObavestenje")]
        public async Task<ActionResult<List<Obavestenja>>> postaviObavestenje(string userId,string message){
            var user = await context.korisnici.Where(x=>x.id.ToString()==userId).FirstOrDefaultAsync();
            if(user==null){
                return BadRequest("Ne postojeci user");
            }
            var obav = new Obavestenja{
                id = Guid.NewGuid(),
                primalac = user,
                poruka = message,
                vremePoruke = DateTime.Now,
                procitana = false
            };
            await context.obavestenja.AddAsync(obav);
            await context.SaveChangesAsync();

            var listaObavestenja = await context.obavestenja.Where(x=>x.primalac.id.ToString()==userId).ToListAsync();

            return Ok(listaObavestenja);
        }

        [HttpPut]
        [Route("procitajObavestenja")]
        public async Task<ActionResult<List<Obavestenja>>> procitajObavestenja(string userId){
            var user = await context.korisnici.Where(x=>x.id.ToString()==userId).FirstOrDefaultAsync();
            if(user==null){
                return BadRequest("Ne postojeci user");
            }
            var listaObavestenja = await context.obavestenja.Where(x=>x.primalac.id.ToString()==userId && x.procitana==false).ToListAsync();
            foreach(var obav in listaObavestenja){
                obav.procitana = true;
                context.obavestenja.Update(obav);
            }
            await context.SaveChangesAsync();
            var listaObavestenjaSva = await context.obavestenja.Where(x=>x.primalac.id.ToString()==userId).ToListAsync();
            return Ok(listaObavestenjaSva);
        }

        [HttpGet]
        [Route("vratiObavestenja")]
        public async Task<ActionResult<List<Obavestenja>>> vratiObavestenja(string userId){
            var user = await context.korisnici.Where(x=>x.id.ToString()==userId).FirstOrDefaultAsync();
            if(user==null){
                return BadRequest("Ne postojeci user");
            }
            var listaObavestenja = await context.obavestenja.Where(x=>x.primalac.id.ToString()==userId).ToListAsync();
            return Ok(listaObavestenja);
        }

        [HttpGet]
        [Route("vratiNeprocitanaObavestenja")]
        public async Task<ActionResult<List<Obavestenja>>> vratiNeprocitanaObavestenja(string userId){
            var user = await context.korisnici.Where(x=>x.id.ToString()==userId).FirstOrDefaultAsync();
            if(user==null){
                return BadRequest("Ne postojeci user");
            }
            var listaObavestenja = await context.obavestenja.Where(x=>x.primalac.id.ToString()==userId && x.procitana==false).ToListAsync();
            return Ok(listaObavestenja);
        }

        [HttpDelete]
        [Route("obrisiObavestenja")]
        public async Task<ActionResult<List<Obavestenja>>> obrisiObavestenja(string userId){
            var user = await context.korisnici.Where(x=>x.id.ToString()==userId).FirstOrDefaultAsync();
            if(user==null){
                return BadRequest("Ne postojeci user");
            }
            var listaObavestenja = await context.obavestenja.Where(x=>x.primalac.id.ToString()==userId).ToListAsync();
            foreach(var obav in listaObavestenja){
                obav.procitana = true;
                context.obavestenja.Remove(obav);
            }
            await context.SaveChangesAsync();
            return Ok(listaObavestenja);
        }
    }
}