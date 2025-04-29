
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hostably.Models
{
    public class Reservation
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public int PropertyId { get; set; }
        
        [Required]
        public int RenterId { get; set; }
        
        [Required]
        public DateTime CheckInDate { get; set; }
        
        [Required]
        public DateTime CheckOutDate { get; set; }
        
        [Required]
        public int Guests { get; set; }
        
        [Required]
        [Column(TypeName = "decimal(10, 2)")]
        public decimal TotalPrice { get; set; }
        
        [Required]
        public ReservationStatus Status { get; set; } = ReservationStatus.Pending;
        
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        
        // Navigation properties
        [ForeignKey("PropertyId")]
        public Property? Property { get; set; }
        
        [ForeignKey("RenterId")]
        public User? Renter { get; set; }
    }

    public enum ReservationStatus
    {
        Pending,
        Confirmed,
        Cancelled,
        Completed
    }
}
