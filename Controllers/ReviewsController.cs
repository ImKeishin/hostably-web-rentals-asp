
using Hostably.Services;
using Hostably.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Hostably.Controllers
{
    public class ReviewsController : Controller
    {
        private readonly IReviewService _reviewService;
        private readonly IPropertyService _propertyService;

        public ReviewsController(IReviewService reviewService, IPropertyService propertyService)
        {
            _reviewService = reviewService;
            _propertyService = propertyService;
        }

        public async Task<IActionResult> Index(int propertyId)
        {
            var reviews = await _reviewService.GetReviewsByPropertyIdAsync(propertyId);
            var property = await _propertyService.GetPropertyByIdAsync(propertyId);
            
            if (property == null)
            {
                return NotFound();
            }
            
            ViewBag.Property = property;
            return View(reviews);
        }

        [Authorize(Roles = "Renter")]
        [HttpGet]
        public async Task<IActionResult> Create(int propertyId)
        {
            var property = await _propertyService.GetPropertyByIdAsync(propertyId);
            if (property == null)
            {
                return NotFound();
            }
            
            ViewBag.Property = property;
            return View();
        }

        [Authorize(Roles = "Renter")]
        [HttpPost]
        public async Task<IActionResult> Create(CreateReviewViewModel model)
        {
            if (!ModelState.IsValid)
            {
                var property = await _propertyService.GetPropertyByIdAsync(model.PropertyId);
                ViewBag.Property = property;
                return View(model);
            }

            // Set user ID from current user
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            model.UserId = int.Parse(userId);

            var result = await _reviewService.CreateReviewAsync(model);
            if (!result.Success)
            {
                ModelState.AddModelError("", result.Message);
                
                var property = await _propertyService.GetPropertyByIdAsync(model.PropertyId);
                ViewBag.Property = property;
                
                return View(model);
            }

            return RedirectToAction("Details", "Properties", new { id = model.PropertyId });
        }
    }
}
