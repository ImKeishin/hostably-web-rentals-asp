
using Hostably.Data;
using Hostably.Models;
using Hostably.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace Hostably.Services
{
    public class ReviewService : IReviewService
    {
        private readonly ApplicationDbContext _context;

        public ReviewService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ReviewViewModel>> GetReviewsByPropertyIdAsync(int propertyId)
        {
            return await _context.Reviews
                .Where(r => r.PropertyId == propertyId)
                .Include(r => r.User)
                .Select(r => new ReviewViewModel
                {
                    Id = r.Id,
                    Rating = r.Rating,
                    Comment = r.Comment,
                    UserName = r.User.Name,
                    CreatedAt = r.CreatedAt
                })
                .ToListAsync();
        }

        public async Task<ReviewResponseViewModel> CreateReviewAsync(CreateReviewViewModel model)
        {
            // Check if property exists
            var property = await _context.Properties.FindAsync(model.PropertyId);
            if (property == null)
            {
                return new ReviewResponseViewModel
                {
                    Success = false,
                    Message = "Property not found"
                };
            }

            // Check if user has stayed at the property
            var hasStayed = await _context.Reservations
                .AnyAsync(r => r.PropertyId == model.PropertyId && 
                               r.RenterId == model.UserId && 
                               r.Status == ReservationStatus.Completed);

            if (!hasStayed)
            {
                return new ReviewResponseViewModel
                {
                    Success = false,
                    Message = "You can only review properties that you have stayed at"
                };
            }

            // Check if user has already reviewed this property
            var hasReviewed = await _context.Reviews
                .AnyAsync(r => r.PropertyId == model.PropertyId && r.UserId == model.UserId);

            if (hasReviewed)
            {
                return new ReviewResponseViewModel
                {
                    Success = false,
                    Message = "You have already reviewed this property"
                };
            }

            // Create review
            var review = new Review
            {
                PropertyId = model.PropertyId,
                UserId = model.UserId,
                Rating = model.Rating,
                Comment = model.Comment
            };

            await _context.Reviews.AddAsync(review);
            await _context.SaveChangesAsync();

            return new ReviewResponseViewModel
            {
                Success = true,
                Message = "Review created successfully",
                ReviewId = review.Id
            };
        }
    }
}
