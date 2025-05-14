namespace MeetAppApi.Models
{
    public class EventCategory
    {
        public int EventId { get; set; }

        public int CategoryId { get; set; }

        // Navigation Properties

        public Event? Event { get; set; }

        public Category? Category { get; set; }
    }
}
