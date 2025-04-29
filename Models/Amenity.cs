
using System.ComponentModel.DataAnnotations;

namespace Hostably.Models
{
    public class Amenity
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        // Navigation property
        public ICollection<PropertyAmenity>? PropertyAmenities { get; set; }
    }
}
