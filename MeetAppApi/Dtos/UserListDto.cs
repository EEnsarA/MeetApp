using MeetAppApi.Models;

namespace MeetAppApi.Dtos
{
    public class UserListDto
    {
        public int Id { get; set; }

        public string? UserName { get; set; }


        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string FullName => string.Join(" ", FirstName, LastName);

        public string? Email { get; set; }

        public string? Location { get; set; }

        public string? HashedPassword { get; set; }

        public bool IsApproved { get; set; }

        public DateTime? CreatedTime { get; set; }

        public Role Role { get; set; }
    }
}
