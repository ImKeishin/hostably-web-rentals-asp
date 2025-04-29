
using Hostably.Models;
using Hostably.ViewModels;

namespace Hostably.Services
{
    public interface IReservationService
    {
        Task<IEnumerable<ReservationViewModel>> GetReservationsByRenterIdAsync(int renterId);
        Task<IEnumerable<ReservationViewModel>> GetReservationsByHostIdAsync(int hostId);
        Task<ReservationResponseViewModel> CreateReservationAsync(CreateReservationViewModel model);
        Task<bool> UpdateReservationStatusAsync(int id, ReservationStatus status);
    }
}
