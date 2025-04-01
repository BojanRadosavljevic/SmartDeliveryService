using System.IdentityModel.Tokens.Jwt;
using System.Reflection;
using System.Security.Claims;
using System.Text;
using Data;
using DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Models;
using Services;

namespace Controllers{
    [ApiController]
    [Route("[Controller]")]
    public class AuthController:ControllerBase{
       public AppDbContext context { get; set;}

       public AuthController(AppDbContext contexta){
            context= contexta;
       } 

       [HttpPost]
       [Route("Register")]
       public async Task<ActionResult<object>> Register([FromBody]RegisterDTO regDTO){
            var check = false;
            foreach(PropertyInfo property in regDTO.GetType().GetProperties()){
                if(property.Name != regDTO.dostavljacBool.ToString()){
                    check = CheckInfo.RegisterCheck(property.Name,property.GetValue(regDTO).ToString());
                    if(check==false){
                        return BadRequest($"{property.Name} ne moze imati vrednost {property.GetValue(regDTO)}");
                    }
                }
            }
            var obj = await context.korisnici.Where(x=>x.username==regDTO.username).FirstOrDefaultAsync();
            if(obj!=null){
                return BadRequest("Vec postoji korisnik sa tim usernameom");
            }
            var obj2 = await context.dostavljaci.Where(x=>x.username==regDTO.username).FirstOrDefaultAsync();
            if(obj2!=null){
                return BadRequest("Vec postoji dostavljac sa tim usernameom");
            }
            if(regDTO.dostavljacBool){
                var dost = new Dostavljac{
                    id = new Guid(),
                    ime = regDTO.ime,
                    prezime = regDTO.prezime,
                    brojTelefona = regDTO.brojTelefona,
                    username = regDTO.username,
                    password = PasswordCrypting.EncryptPassword(regDTO.password,regDTO.username)
                    };
                await context.dostavljaci.AddAsync(dost);
                await context.SaveChangesAsync();
                string key1="Token";
                string value = TokenHandling.TokenCreating(dost.id.ToString(),"dostavljac");

                CookieOptions co = new CookieOptions{
                    Expires=DateTime.Now.AddHours(1)
                };
                HttpContext.Response.Cookies.Append(key1,value,co);

                dost.password = PasswordCrypting.DecryptPassword(dost.password,dost.username);
                return Ok(dost);

            }else{
                var kor = new Korisnik{
                    id = new Guid(),
                    ime = regDTO.ime,
                    prezime = regDTO.prezime,
                    brojTelefona = regDTO.brojTelefona,
                    username = regDTO.username,
                    password = PasswordCrypting.EncryptPassword(regDTO.password,regDTO.username),
                    adresaZaDostavu = ""
                };
                await context.korisnici.AddAsync(kor);
                await context.SaveChangesAsync();

                string key1="Token";
                string value = TokenHandling.TokenCreating(kor.id.ToString(),"korisnik");

                CookieOptions co = new CookieOptions{
                    Expires=DateTime.Now.AddHours(1)
                };
                HttpContext.Response.Cookies.Append(key1,value,co);

                kor.password = PasswordCrypting.EncryptPassword(kor.password,kor.username);
                return Ok(kor);
            }
       }
       [HttpGet]
       [Route("Login")]
       public async Task<ActionResult<object>> Login(string username,string password){
            if(CheckInfo.RegisterCheck("username",username)==false){
                return BadRequest("Los username");
            }
            if(CheckInfo.RegisterCheck("password",password)==false){
                return BadRequest("Los password");
            }
            var passwordPom = PasswordCrypting.EncryptPassword(password,username);
            var kor = await context.korisnici.Where(x=>x.username==username && x.password==passwordPom).FirstOrDefaultAsync();
            var dost = await context.dostavljaci.Where(x=>x.username==username && x.password==passwordPom).FirstOrDefaultAsync();
            if(kor==null && dost==null){
                return BadRequest("Ne postoji korisnik ili dostavljac");
            }
            if(kor!=null){
                string key1="Token";
                string value = TokenHandling.TokenCreating(kor.id.ToString(),"korisnik");

                CookieOptions co = new CookieOptions{
                    Expires=DateTime.Now.AddHours(1)
                };
                HttpContext.Response.Cookies.Append(key1,value,co);

                kor.password = PasswordCrypting.DecryptPassword(kor.password,kor.username);
                return Ok(kor);

            }else{
                string key1="Token";
                string value = TokenHandling.TokenCreating(dost.id.ToString(),"dostavljac");

                CookieOptions co = new CookieOptions{
                    Expires=DateTime.Now.AddHours(1)
                };
                HttpContext.Response.Cookies.Append(key1,value,co);

                dost.password = PasswordCrypting.DecryptPassword(dost.password,dost.username);
                return Ok(dost);
            }

       }
    }
}