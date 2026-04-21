using Microsoft.AspNetCore.Mvc;
using Domain.DTOs;

namespace Book_Management_System.Controllers
{
    public class AuthController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
