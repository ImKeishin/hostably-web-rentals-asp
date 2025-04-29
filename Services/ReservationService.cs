
using Hostably.Data;
using Hostably.Models;
using Hostably.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace Hostably.Services
{
    public class ReservationService : IReservationService
    {
        private readonly ApplicationDbContext _context;

        public ReservationService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ReservationViewModel>> GetReservationsByRenterIdAsync(int renterId)
        {
            return await _context.Reservations
                .Where(r => r.RenterId == renterId)
                .Include(r => r.Property)
                .Include(r => r.Property.Host)
                .Select(r => new ReservationViewModel
                {
                    Id = r.Id,
                    PropertyId = r.PropertyId,
                    PropertyTitle = r.Property.Title,
                    PropertyLocation = r.Property.Location,
                    PropertyImage = r.Property.ImageUrl,
                    HostName = r.Property.Host.Name,
                    CheckInDate = r.CheckInDate,
                    CheckOutDate = r.CheckOutDate,
                    Guests = r.Guests,
                    TotalPrice = r.TotalPrice,
                    Status = r.Status.ToString(),
                    CreatedAt = r.CreatedAt
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<ReservationViewModel>> GetReservationsByHostIdAsync(int hostId)
        {
            return await _context.Reservations
                .Include(r => r.Property)
                .Where(r => r.Property.HostId == hostId)
                .Include(r => r.Renter)
                .Select(r => new ReservationViewModel
                {
                    Id = r.Id,
                    PropertyId = r.PropertyId,
                    PropertyTitle = r.Property.Title,
                    PropertyLocation = r.Property.Location,
                    PropertyImage = r.Property.ImageUrl,
                    RenterName = r.Renter.Name,
                    CheckInDate = r.CheckInDate,
                    CheckOutDate = r.CheckOutDate,
                    Guests = r.Guests,
                    TotalPrice = r.TotalPrice,
                    Status = r.Status.ToString(),
                    CreatedAt = r.CreatedAt
                })
                .ToListAsync();
        }

        public async Task<ReservationResponseViewModel> CreateReservationAsync(CreateReservationViewModel model)
        {
            // Check if property exists
            var property = await _context.Properties.FindAsync(model.PropertyId);
            if (property == null)
            {
                return new ReservationResponseViewModel
                {
                    Success = false,
                    Message = "Property not found"
                };
            }

            // Check if dates are valid
            if (model.CheckInDate >= model.CheckOutDate)
            {
                return new ReservationResponseViewModel
                {
                    Success = false,
                    Message = "Check-in date must be before check-out date"
                };
            }

            // Check if property is available for the selected dates
            var isAvailable = !await _context.Reservations
                .Where(r => r.PropertyId == model.PropertyId && r.Status != ReservationStatus.Cancelled)
                .AnyAsync(r =>
                    (r.CheckInDate <= model.CheckInDate && r.CheckOutDate > model.CheckInDate) ||
                    (r.CheckInDate < model.CheckOutDate && r.CheckOutDate >= model.CheckOutDate) ||
                    (r.CheckInDate >= model.CheckInDate && r.CheckOutDate <= model.CheckOutDate));

            if (!isAvailable)
            {
                return new ReservationResponseViewModel
                {
                    Success = false,
                    Message = "Property is not available for the selected dates"
                };
            }

            // Create reservation
            var reservation = new Reservation
            {
                PropertyId = model.PropertyId,
                RenterId = model.RenterId,
                CheckInDate = model.CheckInDate,
                CheckOutDate = model.CheckOutDate,
                Guests = model.Guests,
                TotalPrice = model.TotalPrice,
                Status = ReservationStatus.Pending
            };

            await _context.Reservations.AddAsync(reservation);
            await _context.SaveChangesAsync();

            return new ReservationResponseViewModel
            {
                Success = true,
                Message = "Reservation created successfully",
                ReservationId = reservation.Id
            };
        }

        public async Task<bool> UpdateReservationStatusAsync(int id, ReservationStatus status)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation == null) return false;

            reservation.Status = status;
            _context.Reservations.Update(reservation);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
