
using Hostably.Data;
using Hostably.Models;
using Hostably.ViewModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Hostably.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public UserService(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<AuthResponse> RegisterAsync(RegisterViewModel model)
        {
            // Check if user already exists
            if (await _context.Users.AnyAsync(u => u.Email == model.Email))
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "User with this email already exists"
                };
            }

            // Create new user
            var user = new User
            {
                Name = model.Name,
                Email = model.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password),
                UserType = model.UserType == "host" ? UserType.Host : UserType.Renter
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            // Generate token
            var token = GenerateJwtToken(user);

            return new AuthResponse
            {
                Success = true,
                Message = "Registration successful",
                Token = token,
                UserId = user.Id,
                Name = user.Name,
                Email = user.Email,
                UserType = user.UserType.ToString().ToLower()
            };
        }

        public async Task<AuthResponse> LoginAsync(LoginViewModel model)
        {
            // Find user by email
            var user = await _context.Users.FirstOrDefaultAsync(u => 
                u.Email == model.Email && 
                (model.UserType == "host" ? u.UserType == UserType.Host : u.UserType == UserType.Renter));

            if (user == null)
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "Invalid email or password"
                };
            }

            // Verify password
            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash);
            if (!isPasswordValid)
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "Invalid email or password"
                };
            }

            // Generate token
            var token = GenerateJwtToken(user);

            return new AuthResponse
            {
                Success = true,
                Message = "Login successful",
                Token = token,
                UserId = user.Id,
                Name = user.Name,
                Email = user.Email,
                UserType = user.UserType.ToString().ToLower()
            };
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<bool> UpdateUserAsync(int id, UpdateUserViewModel model)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            user.Name = model.Name ?? user.Name;
            user.Email = model.Email ?? user.Email;

            if (!string.IsNullOrEmpty(model.Password))
            {
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password);
            }

            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return true;
        }

        private string GenerateJwtToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.UserType.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["Jwt:DurationInMinutes"])),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
