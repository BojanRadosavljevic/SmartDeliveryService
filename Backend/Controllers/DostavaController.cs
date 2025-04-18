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
       public async Task<ActionResult<Dostava>> napraviDostavu(string paketId,string dostavljacId){
            var paketa = await context.paketi.Where(x=>x.id.ToString()==paketId).FirstOrDefaultAsync();
            if(paketa==null){
                return BadRequest("Ne postojeci paket");
            }
            var dostavljaca = await context.dostavljaci.Where(x=>x.id.ToString()==dostavljacId).FirstOrDefaultAsync();
            if(dostavljaca==null){
                return BadRequest("Ne postojeci dostavljac");
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
    }
}