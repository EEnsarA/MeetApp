using MeetAppApi.Models;
namespace MeetAppApi.Helpers
{
    public static class SeedData
    {


        public static List<User> CreateUser()
        {

            var userData = new (int id, string firstName, string lastName, string userName, string email, string rawPassword, string location, Role role, DateTime createdTime)[]
            {
                (1,"Ensar","Atıcı","ensaratc_","ensar.atc@gmail.com","ensar123","Erzincan/TR",Role.Admin,DateTime.Now),
                (2,"John","Doe","john_doe","john@hotmail.com","john123","Washington/US",Role.User,DateTime.Now),
                (3,"Ahmet","Yıldız","Yıldız_1903","yıldız@gmail.com","yıldız123","Ankara/TR",Role.User,DateTime.Now),
            };



            var users = userData.Select(u => new User
            {
                Id = u.id,
                FirstName = u.firstName,
                LastName = u.lastName,
                UserName = u.userName,
                Email = u.email,
                HashedPassword = PasswordHasher.HashPassword(u.rawPassword),
                Location = u.location,
                Role = u.role,
                CreatedTime = u.createdTime,
            }).ToList();

            return users;
        }
    }
}
