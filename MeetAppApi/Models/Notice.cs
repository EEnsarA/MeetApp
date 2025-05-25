namespace MeetAppApi.Models
{
    public class Notice
    {
        public int Id { get; set; }

        public string NoticeHeader { get; set; } = default!;
        public string NoticeDetail { get; set; } = default!;

        // Foreign key
        public int UserId { get; set; }

        // Navigation
        public User User { get; set; } = default!;
    }
}
