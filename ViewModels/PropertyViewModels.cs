
using System.ComponentModel.DataAnnotations;

namespace Hostably.ViewModels
{
    // Property list view model
    public class PropertyViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public decimal PricePerNight { get; set; }
        public int Bedrooms { get; set; }
        public string? ImageUrl { get; set; }
        public string HostName { get; set; } = string.Empty;
        public double AvgRating { get; set; }
        public List<string> Amenities { get; set; } = new List<string>();
    }

    // Property detail view model
    public class PropertyDetailViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal PricePerNight { get; set; }
        public int Bedrooms { get; set; }
        public string? ImageUrl { get; set; }
        public int HostId { get; set; }
        public string HostName { get; set; } = string.Empty;
        public List<string> Amenities { get; set; } = new List<string>();
        public List<ReviewViewModel> Reviews { get; set; } = new List<ReviewViewModel>();
    }

    // Create property request
    public class CreatePropertyViewModel
    {
        [Required]
        public int HostId { get; set; }
        
        [Required]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        public string Location { get; set; } = string.Empty;
        
        [Required]
        public string Description { get; set; } = string.Empty;
        
        [Required]
        public decimal PricePerNight { get; set; }
        
        [Required]
        public int Bedrooms { get; set; }
        
        public string? ImageUrl { get; set; }
        
        public List<string>? Amenities { get; set; }
    }

    // Update property request
    public class UpdatePropertyViewModel
    {
        public string? Title { get; set; }
        public string? Location { get; set; }
        public string? Description { get; set; }
        public decimal? PricePerNight { get; set; }
        public int? Bedrooms { get; set; }
        public string? ImageUrl { get; set; }
        public List<string>? Amenities { get; set; }
    }
}
