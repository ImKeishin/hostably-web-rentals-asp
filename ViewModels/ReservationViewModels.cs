
using System.ComponentModel.DataAnnotations;

namespace Hostably.ViewModels
{
    // Reservation view model
    public class ReservationViewModel
    {
        public int Id { get; set; }
        public int PropertyId { get; set; }
        public string PropertyTitle { get; set; } = string.Empty;
        public string PropertyLocation { get; set; } = string.Empty;
        public string? PropertyImage { get; set; }
        public string? HostName { get; set; }
        public string? RenterName { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public int Guests { get; set; }
        public decimal TotalPrice { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }

    // Create reservation request
    public class CreateReservationViewModel
    {
        [Required]
        public int PropertyId { get; set; }
        
        [Required]
        public int RenterId { get; set; }
        
        [Required]
        public DateTime CheckInDate { get; set; }
        
        [Required]
        public DateTime CheckOutDate { get; set; }
        
        [Required]
        [Range(1, 10)]
        public int Guests { get; set; }
        
        [Required]
        public decimal TotalPrice { get; set; }
    }

    // Reservation response
    public class ReservationResponseViewModel
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public int? ReservationId { get; set; }
    }
}
