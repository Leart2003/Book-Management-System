using Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Book_Management_System.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        private readonly FavoriteService _favoriteService;

        public FavoriteController(FavoriteService favoriteService)
        {
            _favoriteService = favoriteService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserFavorite()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId is not null)
            {
                return Unauthorized();
            }
            var favorite = await _favoriteService.GetUserFavorite(userId);

            return Ok(favorite);
        }
    }
}
