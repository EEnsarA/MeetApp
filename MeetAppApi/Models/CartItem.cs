namespace MeetAppApi.Models
{
    public class CartItem
    {
        public int Id { get; set; }

        public int CartId { get; set; }

        public int EventId { get; set; }

        public int Count { get; set; }


        // Navigation Properties

        public Cart Cart { get; set; } = default!;

        public Event Event { get; set; } = default!;
    }
}
