
using Hostably.Models;
using Microsoft.EntityFrameworkCore;

namespace Hostably.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Property> Properties { get; set; } = null!;
        public DbSet<Amenity> Amenities { get; set; } = null!;
        public DbSet<PropertyAmenity> PropertyAmenities { get; set; } = null!;
        public DbSet<Reservation> Reservations { get; set; } = null!;
        public DbSet<Review> Reviews { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure PropertyAmenity as a composite key
            modelBuilder.Entity<PropertyAmenity>()
                .HasKey(pa => new { pa.PropertyId, pa.AmenityId });

            // Configure unique constraints
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Amenity>()
                .HasIndex(a => a.Name)
                .IsUnique();

            modelBuilder.Entity<Review>()
                .HasIndex(r => new { r.PropertyId, r.UserId })
                .IsUnique();

            // Seed default amenities
            modelBuilder.Entity<Amenity>().HasData(
                new Amenity { Id = 1, Name = "WiFi" },
                new Amenity { Id = 2, Name = "Kitchen" },
                new Amenity { Id = 3, Name = "Free Parking" },
                new Amenity { Id = 4, Name = "Swimming Pool" },
                new Amenity { Id = 5, Name = "Air Conditioning" },
                new Amenity { Id = 6, Name = "TV" },
                new Amenity { Id = 7, Name = "Washing Machine" },
                new Amenity { Id = 8, Name = "Heating" },
                new Amenity { Id = 9, Name = "Balcony" },
                new Amenity { Id = 10, Name = "Pet Friendly" }
            );
        }
    }
}
