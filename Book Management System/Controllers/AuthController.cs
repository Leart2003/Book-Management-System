using Microsoft.AspNetCore.Mvc;
using Domain.Dtos;
using Microsoft.AspNetCore.Identity;
using Domain.Entities;

namespace Book_Management_System.Controllers
{
    public class AuthController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        public AuthController(IConfiguration configuration, UserManager<User> userManager)
        {
            _configuration = configuration;
            _userManager = userManager;
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
