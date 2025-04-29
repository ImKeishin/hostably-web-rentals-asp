
using Hostably.Models;
using Hostably.ViewModels;

namespace Hostably.Services
{
    public interface IUserService
    {
        Task<AuthResponse> RegisterAsync(RegisterViewModel model);
        Task<AuthResponse> LoginAsync(LoginViewModel model);
        Task<User> GetUserByIdAsync(int id);
        Task<bool> UpdateUserAsync(int id, UpdateUserViewModel model);
    }
}
