using System.Reflection;
using Data;
using DTOs;
using Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services;

namespace Controllers{
    [ApiController]
    [Route("[controller]")]
    public class UserController:ControllerBase{
        public AppDbContext context { get; set; }
        public UserController(AppDbContext contexta){
            context = contexta;
        }
        [HttpPut]
        [Route("izmeniUsera")]
        public async Task<ActionResult<object>> izmeniUsera([FromBody]UserDTO dto){
            if(dto.role.ToString()=="korisnik"){
                var user = await context.korisnici.Where(x=>x.id.ToString()==dto.id).FirstOrDefaultAsync();
                if(user==null){
                    return BadRequest("Ne postoji user sa tim id-ijem");
                }
                foreach(PropertyInfo property in dto.GetType().GetProperties()){
                    var check = false;
                    check = CheckInfo.RegisterCheck(property.Name,property.GetValue(dto).ToString());
                    if(check==false){
                        return BadRequest($"{property.Name} ne moze imati vrednost {property.GetValue(dto)}");
                    }
                }
                user.ime = dto.ime;
                user.prezime = dto.prezime;
                user.brojTelefona = dto.brojTelefona;
                user.adresaZaDostavu = dto.adresaZaDostavu;
                user.username = dto.username;
                user.password = PasswordCrypting.EncryptPassword(dto.password,dto.username);

                context.korisnici.Update(user);
                await context.SaveChangesAsync();
                user.password=PasswordCrypting.DecryptPassword(user.password,user.username);
                return Ok(user);
            }else if(dto.role.ToString()=="dostavljac"){
                var user = await context.dostavljaci.Where(x=>x.id.ToString()==dto.id).FirstOrDefaultAsync();
                if(user==null){
                    return BadRequest("Ne postoji user sa tim id-ijem");
                }
                foreach(PropertyInfo property in dto.GetType().GetProperties()){
                    var check = false;
                    check = CheckInfo.RegisterCheck(property.Name,property.GetValue(dto).ToString());
                    if(check==false){
                        return BadRequest($"{property.Name} ne moze imati vrednost {property.GetValue(dto)}");
                    }
                }
                user.ime = dto.ime;
                user.prezime = dto.prezime;
                user.brojTelefona = dto.brojTelefona;
                user.username = dto.username;
                user.password = PasswordCrypting.EncryptPassword(dto.password,dto.username);

                context.dostavljaci.Update(user);
                await context.SaveChangesAsync();
                user.password=PasswordCrypting.DecryptPassword(user.password,user.username);
                return Ok(user);
            }else{
                return BadRequest("Ne postoji rola za ovog usera");
            }

        }
        [HttpDelete]
        [Route("obrisiUsera")]
        public async Task<ActionResult<string>> obrisiUsera(string userId){
             var userK = await context.korisnici.Where(x=>x.id.ToString()==userId).FirstOrDefaultAsync();
             var userD = await context.dostavljaci.Where(x=>x.id.ToString()==userId).FirstOrDefaultAsync();
             if(userK!=null){
                context.korisnici.Remove(userK);
                await context.SaveChangesAsync();
                return Ok("Obrisan user");
             }else if(userD!=null){
                context.dostavljaci.Remove(userD);
                await context.SaveChangesAsync();
                return Ok("Obrisan user");
             }else{
                return Ok("Ne postoji user sa tim id-jem");
             }
        }
    }
}