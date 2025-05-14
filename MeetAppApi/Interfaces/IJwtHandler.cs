using MeetAppApi.Models;

namespace MeetAppApi.Interfaces
{
    public interface IJwtHandler
    {
        string GenerateJWT(User user);
    }
}
