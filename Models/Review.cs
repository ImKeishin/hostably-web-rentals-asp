
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hostably.Models
{
    public class Review
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public int PropertyId { get; set; }
        
        [Required]
        public int UserId { get; set; }
        
        [Required]
        [Range(1, 5)]
        public int Rating { get; set; }
        
        public string? Comment { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        
        // Navigation properties
        [ForeignKey("PropertyId")]
        public Property? Property { get; set; }
        
        [ForeignKey("UserId")]
        public User? User { get; set; }
    }
}
