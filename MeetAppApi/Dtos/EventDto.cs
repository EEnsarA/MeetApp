namespace MeetAppApi.Dtos
{
    public class EventDto
    {
        public int Id { get; set; }

        public string EventName { get; set; } = default!;

        public string EventDescription { get; set; } = default!;

        public string ImageUrl { get; set; } = default!;

        public string City { get; set; } = default!;

        public string Country { get; set; } = default!;

        public string Location { get; set; } = default!;

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public int NumberOfTickets { get; set; } = default;

        public decimal TicketPrice { get; set; } = default!;

        public bool IsOnSale { get; set; } = default!;

        public bool IsOnBanner { get; set; } = default!;

        public string Rules { get; set; } = default!;


    }
}
