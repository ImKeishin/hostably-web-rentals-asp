
using Hostably.Models;
using System.ComponentModel.DataAnnotations;

namespace Hostably.ViewModels
{
    // Register request
    public class RegisterViewModel
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        [MinLength(6)]
        public string Password { get; set; } = string.Empty;
        
        [Required]
        public string UserType { get; set; } = string.Empty; // "host" or "renter"
    }

    // Login request
    public class LoginViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        public string Password { get; set; } = string.Empty;
        
        [Required]
        public string UserType { get; set; } = string.Empty; // "host" or "renter"
    }

    // Update user request
    public class UpdateUserViewModel
    {
        public string? Name { get; set; }
        
        [EmailAddress]
        public string? Email { get; set; }
        
        [MinLength(6)]
        public string? Password { get; set; }
    }

    // Auth response
    public class AuthResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public string? Token { get; set; }
        public int? UserId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? UserType { get; set; }
    }
}
