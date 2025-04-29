
using Hostably.Data;
using Hostably.Models;
using Hostably.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace Hostably.Services
{
    public class PropertyService : IPropertyService
    {
        private readonly ApplicationDbContext _context;

        public PropertyService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PropertyViewModel>> GetAllPropertiesAsync()
        {
            return await _context.Properties
                .Include(p => p.Host)
                .Include(p => p.Reviews)
                .Include(p => p.PropertyAmenities)
                .ThenInclude(pa => pa.Amenity)
                .Select(p => new PropertyViewModel
                {
                    Id = p.Id,
                    Title = p.Title,
                    Location = p.Location,
                    PricePerNight = p.PricePerNight,
                    Bedrooms = p.Bedrooms,
                    ImageUrl = p.ImageUrl,
                    HostName = p.Host.Name,
                    AvgRating = p.Reviews.Any() ? p.Reviews.Average(r => r.Rating) : 0,
                    Amenities = p.PropertyAmenities.Select(pa => pa.Amenity.Name).ToList()
                })
                .ToListAsync();
        }

        public async Task<PropertyDetailViewModel> GetPropertyByIdAsync(int id)
        {
            var property = await _context.Properties
                .Include(p => p.Host)
                .Include(p => p.PropertyAmenities)
                .ThenInclude(pa => pa.Amenity)
                .Include(p => p.Reviews)
                .ThenInclude(r => r.User)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (property == null)
                return null;

            return new PropertyDetailViewModel
            {
                Id = property.Id,
                Title = property.Title,
                Location = property.Location,
                Description = property.Description,
                PricePerNight = property.PricePerNight,
                Bedrooms = property.Bedrooms,
                ImageUrl = property.ImageUrl,
                HostId = property.HostId,
                HostName = property.Host.Name,
                Amenities = property.PropertyAmenities.Select(pa => pa.Amenity.Name).ToList(),
                Reviews = property.Reviews.Select(r => new ReviewViewModel
                {
                    Id = r.Id,
                    Rating = r.Rating,
                    Comment = r.Comment,
                    UserName = r.User.Name,
                    CreatedAt = r.CreatedAt
                }).ToList()
            };
        }

        public async Task<IEnumerable<PropertyViewModel>> GetPropertiesByHostIdAsync(int hostId)
        {
            return await _context.Properties
                .Where(p => p.HostId == hostId)
                .Include(p => p.PropertyAmenities)
                .ThenInclude(pa => pa.Amenity)
                .Include(p => p.Reviews)
                .Select(p => new PropertyViewModel
                {
                    Id = p.Id,
                    Title = p.Title,
                    Location = p.Location,
                    PricePerNight = p.PricePerNight,
                    Bedrooms = p.Bedrooms,
                    ImageUrl = p.ImageUrl,
                    HostName = p.Host.Name,
                    AvgRating = p.Reviews.Any() ? p.Reviews.Average(r => r.Rating) : 0,
                    Amenities = p.PropertyAmenities.Select(pa => pa.Amenity.Name).ToList()
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<PropertyViewModel>> SearchPropertiesAsync(string searchTerm)
        {
            return await _context.Properties
                .Where(p => p.Title.Contains(searchTerm) || 
                           p.Location.Contains(searchTerm) || 
                           p.Description.Contains(searchTerm))
                .Include(p => p.Host)
                .Include(p => p.Reviews)
                .Include(p => p.PropertyAmenities)
                .ThenInclude(pa => pa.Amenity)
                .Select(p => new PropertyViewModel
                {
                    Id = p.Id,
                    Title = p.Title,
                    Location = p.Location,
                    PricePerNight = p.PricePerNight,
                    Bedrooms = p.Bedrooms,
                    ImageUrl = p.ImageUrl,
                    HostName = p.Host.Name,
                    AvgRating = p.Reviews.Any() ? p.Reviews.Average(r => r.Rating) : 0,
                    Amenities = p.PropertyAmenities.Select(pa => pa.Amenity.Name).ToList()
                })
                .ToListAsync();
        }

        public async Task<PropertyDetailViewModel> CreatePropertyAsync(CreatePropertyViewModel model)
        {
            var property = new Property
            {
                HostId = model.HostId,
                Title = model.Title,
                Location = model.Location,
                Description = model.Description,
                PricePerNight = model.PricePerNight,
                Bedrooms = model.Bedrooms,
                ImageUrl = model.ImageUrl
            };

            await _context.Properties.AddAsync(property);
            await _context.SaveChangesAsync();

            // Add amenities
            if (model.Amenities != null && model.Amenities.Any())
            {
                foreach (var amenityName in model.Amenities)
                {
                    var amenity = await _context.Amenities
                        .FirstOrDefaultAsync(a => a.Name.ToLower() == amenityName.ToLower());

                    if (amenity != null)
                    {
                        await _context.PropertyAmenities.AddAsync(new PropertyAmenity
                        {
                            PropertyId = property.Id,
                            AmenityId = amenity.Id
                        });
                    }
                }
                await _context.SaveChangesAsync();
            }

            return await GetPropertyByIdAsync(property.Id);
        }

        public async Task<bool> UpdatePropertyAsync(int id, UpdatePropertyViewModel model)
        {
            var property = await _context.Properties.FindAsync(id);
            if (property == null) return false;

            property.Title = model.Title ?? property.Title;
            property.Location = model.Location ?? property.Location;
            property.Description = model.Description ?? property.Description;
            property.PricePerNight = model.PricePerNight ?? property.PricePerNight;
            property.Bedrooms = model.Bedrooms ?? property.Bedrooms;
            property.ImageUrl = model.ImageUrl ?? property.ImageUrl;

            _context.Properties.Update(property);

            // Update amenities if provided
            if (model.Amenities != null)
            {
                // Remove existing amenities
                var existingAmenities = await _context.PropertyAmenities
                    .Where(pa => pa.PropertyId == id)
                    .ToListAsync();

                _context.PropertyAmenities.RemoveRange(existingAmenities);

                // Add new amenities
                foreach (var amenityName in model.Amenities)
                {
                    var amenity = await _context.Amenities
                        .FirstOrDefaultAsync(a => a.Name.ToLower() == amenityName.ToLower());

                    if (amenity != null)
                    {
                        await _context.PropertyAmenities.AddAsync(new PropertyAmenity
                        {
                            PropertyId = property.Id,
                            AmenityId = amenity.Id
                        });
                    }
                }
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeletePropertyAsync(int id)
        {
            var property = await _context.Properties.FindAsync(id);
            if (property == null) return false;

            _context.Properties.Remove(property);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
