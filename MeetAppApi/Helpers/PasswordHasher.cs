using BCrypt.Net;
namespace MeetAppApi.Helpers
{
    
    public static class PasswordHasher
    {
        public static string HashPassword(string password)
        {
            string HashedPassword = BCrypt.Net.BCrypt.HashPassword(password);
            return HashedPassword;
        }
        public static bool VerifyPassword(string rawPassword,string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(rawPassword, hashedPassword);
        }
    }
}
