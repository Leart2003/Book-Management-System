using Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Book_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingController : ControllerBase
    {
        private readonly RatingService _ratingService;

        public RatingController(RatingService ratingService)
        {
            _ratingService = ratingService;
        }

        /// <summary>
        /// Adds or updates a rating for a specific book.
        /// </summary>
        /// <param name="bookId">The ID of the book to rate.</param>
        /// <param name="stars">The number of stars given to the book.</param>
        /// <returns>
        /// Returns a success message if the rating was added,
        /// unauthorized if the user is not authenticated,
        /// or bad request if the rating is invalid.
        /// </returns>
        
        [HttpPost("{bookId}")]
        public async Task<IActionResult> RateBook(int bookId, [FromBody] int stars)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            { return Unauthorized(); }
                try
                {
                    await _ratingService.RateBookAsync(bookId, userId, stars);
                    return Ok("Rating added succesfully");

                }
                catch (ArgumentException ex)
                {

                    return BadRequest(ex.Message);
                }

            
        }

        /// <summary>
        /// Retrieves the average rating of a specific book.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <returns>
        /// Returns the book ID and its average rating.
        /// </returns>
        /// <response code="200">The average rating was successfully retrieved.</response>

        [HttpGet("{bookId}")]
      
         public async Task<IActionResult> GetAverageRating(int bookId)
    {
        var average = await _ratingService.GetAverageRatingAsync(bookId);
        return Ok(new { bookId, averageRating = average });
    }
    }
}
