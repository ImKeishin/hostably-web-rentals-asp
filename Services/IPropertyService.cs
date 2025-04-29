
using Hostably.Models;
using Hostably.ViewModels;

namespace Hostably.Services
{
    public interface IPropertyService
    {
        Task<IEnumerable<PropertyViewModel>> GetAllPropertiesAsync();
        Task<PropertyDetailViewModel> GetPropertyByIdAsync(int id);
        Task<IEnumerable<PropertyViewModel>> GetPropertiesByHostIdAsync(int hostId);
        Task<IEnumerable<PropertyViewModel>> SearchPropertiesAsync(string searchTerm);
        Task<PropertyDetailViewModel> CreatePropertyAsync(CreatePropertyViewModel model);
        Task<bool> UpdatePropertyAsync(int id, UpdatePropertyViewModel model);
        Task<bool> DeletePropertyAsync(int id);
    }
}
