namespace MeetAppApi.Models
{

    public enum Role
    {
        User,
        Admin,
    }


    public class User
    {
        public int Id { get; set; }

        public string FirstName { get; set; } = default!;

        public string LastName { get; set; } = default!;

        public string FullName => string.Join(" ",FirstName,LastName);

        public string UserName {  get; set; } = default!;

        public string Location { get; set; } = default!;

        public string Email { get; set; } = default!;

        public string HashedPassword { get; set; } = default!;

        public bool isApproved { get; set; }

        public DateTime CreatedTime { get; set; }

        public Role Role { get; set; } = Role.User;

        // Navigation Properties
        public Cart Cart { get; set; } = default!;

        public Notice? Notice { get; set; }


    }
}
