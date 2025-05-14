namespace MeetAppApi.Models
{
    public class CartEvent
    {
        public int Id { get; set; } 

        public int CartId { get; set; }
        
        public Cart? Cart { get; set; }

        public int EventId { get; set; }

        public Event? Event { get; set; }

        public int NumberOfTicket {  get; set; }    
    
    }
}
