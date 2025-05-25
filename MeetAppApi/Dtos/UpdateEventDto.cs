namespace MeetAppApi.Dtos
{
    public class UpdateEventDto
    {
        public string EventName { get; set; } = default!;

        public string EventDescription { get; set; } = default!;

        public string City { get; set; } = default!;

        public string Country { get; set; } = default!;

        public string Location { get; set; } = default!;

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public int NumberOfTickets { get; set; } = default;

        public double TicketPrice { get; set; } = default!;

        public bool IsOnSale { get; set; } = default!;

        public bool IsOnBanner { get; set; } = default!;

        public string Rules { get; set; } = default!;

        public List<int>? CategoryIds { get; set; }

        public IFormFile? Image { get; set; } = default!;
    }
}
