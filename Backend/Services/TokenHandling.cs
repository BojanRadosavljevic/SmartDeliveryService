using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Services{
    public class TokenHandling{
        public static string TokenCreating(string id,string role){
             var claims = new List<Claim>{
                new Claim(ClaimTypes.PrimarySid,id.ToString()),
                new Claim(ClaimTypes.Name,role)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("JwtSettings:SecretKey"));
            var creds = new SigningCredentials(key,SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: "http://localhost:5147",
                audience: "http://localhost:5147",
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);

             string value = new JwtSecurityTokenHandler().WriteToken(token);

             return value;
        }
    }
}