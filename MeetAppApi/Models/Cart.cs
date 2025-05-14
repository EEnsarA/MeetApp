using System.ComponentModel.DataAnnotations.Schema;

namespace MeetAppApi.Models
{
    public class Cart
    {
        public int Id { get; set; }
        // FK        
        public int UserId { get; set; }

        // Navigation Property
        public User? User { get; set; } 

        public ICollection<CartEvent> ?Events { get; set; }
    }
}
