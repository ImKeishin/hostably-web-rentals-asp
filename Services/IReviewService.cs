
using Hostably.Models;
using Hostably.ViewModels;

namespace Hostably.Services
{
    public interface IReviewService
    {
        Task<IEnumerable<ReviewViewModel>> GetReviewsByPropertyIdAsync(int propertyId);
        Task<ReviewResponseViewModel> CreateReviewAsync(CreateReviewViewModel model);
    }
}
