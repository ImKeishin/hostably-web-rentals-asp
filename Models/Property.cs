
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hostably.Models
{
    public class Property
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public int HostId { get; set; }
        
        [Required]
        [StringLength(255)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        [StringLength(255)]
        public string Location { get; set; } = string.Empty;
        
        [Required]
        public string Description { get; set; } = string.Empty;
        
        [Required]
        [Column(TypeName = "decimal(10, 2)")]
        public decimal PricePerNight { get; set; }
        
        [Required]
        public int Bedrooms { get; set; }
        
        [StringLength(255)]
        public string? ImageUrl { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        
        // Navigation properties
        [ForeignKey("HostId")]
        public User? Host { get; set; }
        
        public ICollection<PropertyAmenity>? PropertyAmenities { get; set; }
        public ICollection<Reservation>? Reservations { get; set; }
        public ICollection<Review>? Reviews { get; set; }
    }
}
