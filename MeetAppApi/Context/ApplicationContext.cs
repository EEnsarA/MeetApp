
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
                .HasForeignKey(c => c.CategoryId);


            // One To One USER-CART 
            modelBuilder.Entity<User>()
                .HasOne(u => u.Cart)
                .WithOne(c => c.User)
                .HasForeignKey<Cart>(c => c.UserId);



            // One To Many CART-CARTITEM    
            modelBuilder.Entity<Cart>()
                .HasMany(c => c.Items)
                .WithOne(ci => ci.Cart)
                .HasForeignKey(i => i.CartId);

            // One To Many EVENT-CARTITEM
            modelBuilder.Entity<Event>()
                .HasMany(e => e.CartItems)
                .WithOne(ci => ci.Event)
                .HasForeignKey(ci => ci.EventId);

            // One To One USER-NOTICE  
            modelBuilder.Entity<User>()
            .HasOne(u => u.Notice)
            .WithOne(n => n.User)
            .HasForeignKey<Notice>(n => n.UserId)
            .OnDelete(DeleteBehavior.Cascade);  // Kullanıcı sillinirse notice de silinir !



            // -- Seed Data

            modelBuilder.Entity<User>().HasData(SeedData.CreateUser());
            modelBuilder.Entity<Category>().HasData(SeedData.CreateCategory());
            modelBuilder.Entity<Event>().HasData(SeedData.createEvent());
            modelBuilder.Entity<EventCategory>().HasData(SeedData.matchCategories());
            modelBuilder.Entity<Cart>().HasData(SeedData.CreateCart());
            modelBuilder.Entity<CartItem>().HasData(SeedData.CreateCartItem());



        }   


        public DbSet<User> Users { get; set; }
        
        public DbSet<Event> Events { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<CartEvent> CartEvents { get; set; }

        public DbSet<EventCategory> EventCategories { get; set; }

        public DbSet<Cart> Carts { get; set; }

        public DbSet<CartItem> CartItems { get; set; }

        public DbSet<Notice> Notices { get; set; }


    }
}
