
using Hostably.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Hostably.Controllers
{
    [Authorize(Roles = "Host")]
    public class HostDashboardController : Controller
    {
        private readonly IPropertyService _propertyService;
        private readonly IReservationService _reservationService;

        public HostDashboardController(IPropertyService propertyService, IReservationService reservationService)
        {
            _propertyService = propertyService;
            _reservationService = reservationService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> MyProperties()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var properties = await _propertyService.GetPropertiesByHostIdAsync(int.Parse(userId));
            return View(properties);
        }

        public async Task<IActionResult> Reservations()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var reservations = await _reservationService.GetReservationsByHostIdAsync(int.Parse(userId));
            return View(reservations);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateReservationStatus(int id, string status)
        {
            if (!Enum.TryParse<Hostably.Models.ReservationStatus>(status, out var reservationStatus))
            {
                return BadRequest("Invalid status");
            }

            var result = await _reservationService.UpdateReservationStatusAsync(id, reservationStatus);
            if (!result)
            {
                return NotFound();
            }

            return RedirectToAction("Reservations");
        }
    }
}
