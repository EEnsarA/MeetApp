
using MeetAppApi.Helpers;
using MeetAppApi.Models;
using Microsoft.EntityFrameworkCore;


namespace MeetAppApi.Context
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Many To Many  EVENT-CATEGORY
            // EventCategory ile Event arasında bire çok ilişki 
            modelBuilder.Entity<EventCategory>().HasKey(k => new {k.EventId,k.CategoryId});
            modelBuilder.Entity<EventCategory>()
                .HasOne(e => e.Event)
                .WithMany(e => e.Categories)
                .HasForeignKey(e => e.EventId);

            // EventCategory ile Category arasında bire çok ilişki
            modelBuilder.Entity<EventCategory>()
                .HasOne(c => c.Category)
                .WithMany(c => c.Events)
                .HasForeignKey(c => c.EventId);


            // One To One USER-CART 
            modelBuilder.Entity<User>()
                .HasOne(u => u.Cart)
                .WithOne(c => c.User)
                .HasForeignKey<Cart>(c => c.UserId);
              


            // Many To Many CART-EVENT    
            modelBuilder.Entity<CartEvent>()
                .HasOne(c => c.Cart)
                .WithMany(c => c.Events)
                .HasForeignKey(c => c.CartId);

            modelBuilder.Entity<CartEvent>()
                .HasOne(e => e.Event)
                .WithMany(c => c.Carts)
                .HasForeignKey(c => c.EventId);


            // -- Seed Data

            modelBuilder.Entity<User>().HasData(SeedData.CreateUser());


        }   


        public DbSet<User> Users { get; set; }
        
        public DbSet<Event> Events { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Cart> Carts { get; set; }


    }
}
