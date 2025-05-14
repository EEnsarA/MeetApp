using AutoMapper;
using MeetAppApi.Context;
using MeetAppApi.Dtos;
using MeetAppApi.Helpers;
using MeetAppApi.Interfaces;
using MeetAppApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;

namespace MeetAppApi.Controllers
{
    //http://localhost:5134/api/Users
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationContext _context;
        
        private readonly IMapper _mapper;


        private readonly IJwtHandler _jwtHandler;

        public UsersController(ApplicationContext context, IMapper mapper,IJwtHandler jwtHandler)
        {
            _context = context;
            _mapper = mapper;
            _jwtHandler = jwtHandler;
        }

        //[Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
            var users = await _context.Users.Select(u => _mapper.Map<UserListDto>(u)).ToListAsync();
            if (users == null)
                return NotFound();

            return Ok(users);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Sunucu hatası oluştu." });
            }
        }

        //http://localhost:5134/api/Users/id 
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int? id)
        {
            try
            {
                var user = await _context.Users.Where(u => u.Id == id).Select(u => _mapper.Map<UserListDto>(u)).FirstOrDefaultAsync();
                if (user == null)
                    return NotFound();
                return Ok(user);    
            }
            catch(Exception) 
            {
                 return StatusCode(500, new { message = "Sunucu hatası oluştu." });
            }
        }

        //http://localhost:5134/api/Users/id => DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int? id)
        {
            try
            {
                // userla eşleşen Cartı Silelim
                var existingCart = await _context.Carts.Where(c=>c.UserId == id).FirstOrDefaultAsync();
                if(existingCart != null)
                {
                    _context.Carts.Remove(existingCart);
                    await _context.SaveChangesAsync();
                }
                var existingUser = await _context.Users.Where(u => u.Id == id).FirstOrDefaultAsync();
                if (existingUser == null)
                    return NotFound();
                _context.Users.Remove(existingUser);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetUserById), new { id }, _mapper.Map<UserListDto>(existingUser));
            }
            catch(Exception )
            {
                return StatusCode(500, new { message = "Sunucu hatası oluştu." });
            }
        }

        //http://localhost:5134/api/Users/register 
        [HttpPost("register")]
        public async Task<IActionResult> CreateUser([FromBody] RegisterDto registerDto)
        {
            if (registerDto == null || !ModelState.IsValid)
                return BadRequest(new { message = "Geçersiz kayıt bilgileri." });

            try
            {

                var user = new User()
                {
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName,
                    UserName = registerDto.UserName,    
                    Email = registerDto.Email,
                    HashedPassword = PasswordHasher.HashPassword(registerDto.Password),
                    Location = registerDto.Location,
                    CreatedTime = DateTime.UtcNow,
                    Role = Role.User,
                };

                var users = await _context.Users.Where(u => u.Email == registerDto.Email || u.UserName == registerDto.UserName).FirstOrDefaultAsync();
                if (users != null)
                    if (users.Email == registerDto.Email)
                        return BadRequest(new { message = "Bu email zaten kayıtlı ." });
                    else
                        return BadRequest(new { message = "Bu kullanıcı adı zaten kayıtlı ." });                          
          
               _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetUserById), new {id = user.Id},_mapper.Map<UserListDto>(user));


            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Sunucu hatası oluştu." });
            }

        }



        private bool IsValidEmail(string? email)
        {
            return new EmailAddressAttribute().IsValid(email);
        }


        //http://localhost:5134/api/Users/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
                if(loginDto == null || !ModelState.IsValid)
                    return BadRequest(new {message = "Geçersiz giriş bilgileri."});
                
            try
            {
                var emailOrUserName = loginDto.EmailOrUserName;

                var user = IsValidEmail(emailOrUserName)
                    ? await _context.Users.FirstOrDefaultAsync(u => u.Email == emailOrUserName)
                    : await _context.Users.FirstOrDefaultAsync(u => u.UserName == emailOrUserName);


                if (user == null)
                    return BadRequest(new { message = "Kullanıcı bulunamadı." });

                if (!PasswordHasher.VerifyPassword(loginDto.Password, user.HashedPassword))
                    return BadRequest(new { message = "Şifre hatalı." });

                var token = _jwtHandler.GenerateJWT(user);
                return Ok(new { token });

            }
            catch (Exception) {
                return StatusCode(500, new { message = "Sunucu hatası oluştu." });
            }
        }




    }
}
