
using Hostably.Services;
using Microsoft.AspNetCore.Mvc;

namespace Hostably.Controllers
{
    public class HomeController : Controller
    {
        private readonly IPropertyService _propertyService;

        public HomeController(IPropertyService propertyService)
        {
            _propertyService = propertyService;
        }

        public async Task<IActionResult> Index()
        {
            var properties = await _propertyService.GetAllPropertiesAsync();
            return View(properties);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View();
        }
    }
}
