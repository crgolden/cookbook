using Microsoft.AspNetCore.Mvc;

namespace cookbook.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
