namespace MeetAppApi.Models
{
    public class Category
    {
        public int Id { get; set; }

        public string CategoryName { get; set; } = default!;

        public virtual ICollection<EventCategory> ?Events { get; set; }

    }
}
