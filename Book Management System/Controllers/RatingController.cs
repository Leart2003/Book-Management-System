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


        [HttpGet("{bookId}")]
      
         public async Task<IActionResult> GetAverageRating(int bookId)
    {
        var average = await _ratingService.GetAverageRatingAsync(bookId);
        return Ok(new { bookId, averageRating = average });
    }
    }
}
