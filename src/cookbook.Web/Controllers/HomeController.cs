using Microsoft.AspNetCore.Mvc;

namespace cookbook.Web.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
