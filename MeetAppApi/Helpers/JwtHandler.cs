using MeetAppApi.Interfaces;
using MeetAppApi.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MeetAppApi.Helpers
{
    public  class JwtHandler : IJwtHandler
    {

        private readonly IConfiguration _config;

        public JwtHandler(IConfiguration config)
        {
            _config = config;
        }

        public string GenerateJWT(User user)
        {
            var _secretKey = _config.GetSection("AppSettings:SecretKey").Value ??
            throw new InvalidOperationException("JWT SecretKey is not found!");
            var _issuer = _config.GetSection("AppSettings:Issuer").Value ?? "MeetApp.com";

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new Claim[]
                    {
                        new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                        new Claim(ClaimTypes.Name,user.FullName ?? ""),
                        new Claim(ClaimTypes.Role,user.Role == Role.Admin ? "Admin" : "User"),
                    }

                    ),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _issuer,
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);  
        }
    }
}
