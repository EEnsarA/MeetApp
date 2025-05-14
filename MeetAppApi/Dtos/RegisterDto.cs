using System.ComponentModel.DataAnnotations;

namespace MeetAppApi.Dtos
{
    public class RegisterDto
    {
        [Required]
        public string FirstName { get; set; } = default!;

        [Required]
        public string LastName { get; set; } = default!;

        [Required]
        public string UserName { get; set; } = default!;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = default!;

        [Required]
        [DataType(DataType.Password)]
        [MinLength(5, ErrorMessage = "Password must be greater than 5 character")]
        [MaxLength(20, ErrorMessage = "Password must be less than 20 character")]
        public string Password { get; set; } = default!;

        [Required]
        [DataType(DataType.Password)]
        [Compare(nameof(Password),ErrorMessage ="Parola eşleşmiyor")]
        public string ConfirmPassword { get; set; } = default!;

        [Required]
        public string Location { get; set; } = default!;    

    }
}
