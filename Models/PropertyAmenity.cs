
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hostably.Models
{
    public class PropertyAmenity
    {
        [Required]
        public int PropertyId { get; set; }
        
        [Required]
        public int AmenityId { get; set; }
        
        // Navigation properties
        [ForeignKey("PropertyId")]
        public Property? Property { get; set; }
        
        [ForeignKey("AmenityId")]
        public Amenity? Amenity { get; set; }
    }
}
