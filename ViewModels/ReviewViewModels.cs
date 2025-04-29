
using System.ComponentModel.DataAnnotations;

namespace Hostably.ViewModels
{
    // Review view model
    public class ReviewViewModel
    {
        public int Id { get; set; }
        public int Rating { get; set; }
        public string? Comment { get; set; }
        public string UserName { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }

    // Create review request
    public class CreateReviewViewModel
    {
        [Required]
        public int PropertyId { get; set; }
        
        [Required]
        public int UserId { get; set; }
        
        [Required]
        [Range(1, 5)]
        public int Rating { get; set; }
        
        public string? Comment { get; set; }
    }

    // Review response
    public class ReviewResponseViewModel
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public int? ReviewId { get; set; }
    }
}
