
using Hostably.Services;
using Hostably.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Hostably.Controllers
{
    public class PropertiesController : Controller
    {
        private readonly IPropertyService _propertyService;

        public PropertiesController(IPropertyService propertyService)
        {
            _propertyService = propertyService;
        }

        public async Task<IActionResult> Index()
        {
            var properties = await _propertyService.GetAllPropertiesAsync();
            return View(properties);
        }

        public async Task<IActionResult> Details(int id)
        {
            var property = await _propertyService.GetPropertyByIdAsync(id);
            if (property == null)
            {
                return NotFound();
            }

            return View(property);
        }

        [HttpGet]
        public IActionResult Create()
        {
            // Check if user is host
            if (!User.IsInRole("Host"))
            {
                return Forbid();
            }

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreatePropertyViewModel model)
        {
            // Check if user is host
            if (!User.IsInRole("Host"))
            {
                return Forbid();
            }

            if (!ModelState.IsValid)
            {
                return View(model);
            }

            // Set host ID from current user
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            model.HostId = int.Parse(userId);

            var result = await _propertyService.CreatePropertyAsync(model);
            
            return RedirectToAction("MyProperties", "HostDashboard");
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            // Check if user is host
            if (!User.IsInRole("Host"))
            {
                return Forbid();
            }

            var property = await _propertyService.GetPropertyByIdAsync(id);
            if (property == null)
            {
                return NotFound();
            }

            // Check if user is the owner of the property
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (property.HostId != int.Parse(userId))
            {
                return Forbid();
            }

            var model = new UpdatePropertyViewModel
            {
                Title = property.Title,
                Location = property.Location,
                Description = property.Description,
                PricePerNight = property.PricePerNight,
                Bedrooms = property.Bedrooms,
                ImageUrl = property.ImageUrl,
                Amenities = property.Amenities
            };

            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(int id, UpdatePropertyViewModel model)
        {
            // Check if user is host
            if (!User.IsInRole("Host"))
            {
                return Forbid();
            }

            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var property = await _propertyService.GetPropertyByIdAsync(id);
            if (property == null)
            {
                return NotFound();
            }

            // Check if user is the owner of the property
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (property.HostId != int.Parse(userId))
            {
                return Forbid();
            }

            var result = await _propertyService.UpdatePropertyAsync(id, model);
            if (!result)
            {
                ModelState.AddModelError("", "Failed to update property");
                return View(model);
            }

            return RedirectToAction("MyProperties", "HostDashboard");
        }

        public async Task<IActionResult> Search(string query)
        {
            var properties = await _propertyService.SearchPropertiesAsync(query);
            ViewBag.Query = query;
            return View(properties);
        }
    }
}
