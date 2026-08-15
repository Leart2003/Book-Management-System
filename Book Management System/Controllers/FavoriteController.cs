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
        /// <summary>
        /// Gets the favorite book of currently authenticated user
        /// </summary>
        /// <returns>Return the user's favorite book if authenticated.If not authenticated returns Unathorized</returns>
        /// <response code="200">The user's favorite books were successfully retrieved.</response>
        /// <response code="401">The user is not authenticated.</response>
        [HttpGet]
        public async Task<IActionResult> GetUserFavorite()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }
            var favorite = await _favoriteService.GetUserFavorite(userId);

            return Ok(favorite);
        }

        /// <summary>
        /// Add a book to user's favorte list.
        /// </summary>
        /// <param name="bookId">The id of the book to be added to favorite List</param>
        /// <returns>Returns Book added to favorite list if the book was added.
        /// If user is not authenticated return Unathorized
        /// </returns>
        /// /// <response code="200">The book was successfully added to the favorite list.</response>
        /// <response code="401">The user is not authenticated.</response>
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

        /// <summary>
        /// Removes a book from user's favorite list
        /// </summary>
        /// <param name="bookId">The id to be removed from user's favorite list</param>
        /// <returns>
        /// If removed returns a success message</returns>
        /// <response code="200">Book removed succesfully from favorite the list</response>
        [HttpDelete]

        public async Task<IActionResult> RemoveFromFavorite(int bookId)
        {
            await _favoriteService.RemoveFavorite(bookId);

            return Ok("Book removed from favorite List");
        }

        /// <summary>
        /// Checks if book is already in user's favorite list
        /// </summary>
        /// <param name="bookId">The id to be checked if is in favorite list</param>
        /// <returns>
        /// Returns a boolean indicating whether the book is marked as a favorite.
        ///
        /// </returns>
     
        [HttpGet("check/{bookId}")]
        public async Task<IActionResult> IsFavorite(int bookId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return Unauthorized();   
            }
            var isFavorite = await  _favoriteService.IsFavoriteAsync(userId,bookId );

            return Ok(IsFavorite);
        }


    }
}
