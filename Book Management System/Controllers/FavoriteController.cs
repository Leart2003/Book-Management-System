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

        [HttpPost]
        public async Task<IActionResult> AddToFavorite(int bookId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized("You need to login First");
                
            }
            await _favoriteService.AddToFavoriteAsync(userId, bookId);

            return Ok("Book added to favorite List");
        }

        [HttpDelete]

        public async Task<IActionResult> RemoveFromFavorite(int bookId)
        {
            await _favoriteService.RemoveFavorite(bookId);

            return Ok("Book removed from favorite List");
        }


        [HttpGet("check/{bookId}")]
        public async Task<IActionResult> IsFavorite(int bookId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return Unauthorized();   
            }
            var isFavorite = _favoriteService.IsFavoriteAsync(userId,bookId );

            return Ok(IsFavorite);
        }


    }
}
