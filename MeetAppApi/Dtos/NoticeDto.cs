namespace MeetAppApi.Dtos
{
    public class NoticeDto
    {
        public int UserId { get; set; }
        public string NoticeHeader { get; set; } = default!;
        public string NoticeDetail { get; set; } = default!;
    }
}
