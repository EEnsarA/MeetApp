using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace MeetAppApi.Dtos
{
    public class LoginDto
    {
        
        public string? EmailOrUserName { get; set; }

        [Required(ErrorMessage ="Şifre zorunludur.")]
        public string Password { get; set; } = default!;

        
        
    }
}
