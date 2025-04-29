
using Hostably.Services;
using Hostably.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Hostably.Controllers
{
    [Authorize]
    public class ReservationsController : Controller
    {
        private readonly IReservationService _reservationService;
        private readonly IPropertyService _propertyService;

        public ReservationsController(IReservationService reservationService, IPropertyService propertyService)
        {
            _reservationService = reservationService;
            _propertyService = propertyService;
        }

        public async Task<IActionResult> Index()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userRole = User.FindFirstValue(ClaimTypes.Role);

            if (userRole == "Host")
            {
                var hostReservations = await _reservationService.GetReservationsByHostIdAsync(int.Parse(userId));
                return View("HostReservations", hostReservations);
            }
            else
            {
                var renterReservations = await _reservationService.GetReservationsByRenterIdAsync(int.Parse(userId));
                return View("RenterReservations", renterReservations);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Create(int propertyId)
        {
            // Check if property exists
            var property = await _propertyService.GetPropertyByIdAsync(propertyId);
            if (property == null)
            {
                return NotFound();
            }

            ViewBag.Property = property;
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateReservationViewModel model)
        {
            // Check if user is renter
            if (User.IsInRole("Host"))
            {
                return Forbid();
            }

            if (!ModelState.IsValid)
            {
                var property = await _propertyService.GetPropertyByIdAsync(model.PropertyId);
                if (property == null)
                {
                    return NotFound();
                }

                ViewBag.Property = property;
                return View(model);
            }

            // Set renter ID from current user
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            model.RenterId = int.Parse(userId);

            var result = await _reservationService.CreateReservationAsync(model);
            if (!result.Success)
            {
                ModelState.AddModelError("", result.Message);
                
                var property = await _propertyService.GetPropertyByIdAsync(model.PropertyId);
                ViewBag.Property = property;
                
                return View(model);
            }

            return RedirectToAction("Index");
        }
    }
}
