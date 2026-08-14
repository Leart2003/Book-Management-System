using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Book_Management_System.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly IKommentRepository _repository;
        /// <summary>
        /// Initializes a new instance of the <see cref="CommentController"/> class.
        /// </summary>
        /// <param name="kommentRepository">
        /// The repository used to manage comments.
        /// </param>
        public CommentController(IKommentRepository kommentRepository)
        {
            _repository = kommentRepository;
        }

        /// <summary>
        /// Retrieves all comments associated with a specific book.
        /// </summary>
        /// <param name="bookId">The ID of the book.</param>
        /// <returns>
        /// Returns a list of comments for the specified book.
        /// </returns>
        [HttpGet("{bookId}")]
        public async Task<IActionResult> GetBookComments(int bookId)
        {
            var comments = await _repository.GetCommentsAsync(bookId);

            return Ok(comments);
        }


        /// <summary>
        /// Adds a new comment to a specific book.
        /// </summary>
        /// <param name="bookId">The ID of the book the comment belongs to.</param>
        /// <param name="content">The content of the comment.</param>
        /// <returns>
        /// Returns a success message if the comment was successfully added,
        /// or unauthorized if the user is not authenticated.
        /// </returns>
        /// <response code="200">The comment was successfully added.</response>
        /// <response code="401">The user is not authenticated.</response>

        [HttpPost("{bookId}")]

        public async Task<IActionResult> PostComment(int bookId, [FromBody] string content)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var comment = new Komment
            {
                UserId = userId,
                BookId = bookId,
                Content = content,
                CreatedAt = DateTime.UtcNow
            };

            await _repository.AddCommentAsync(comment);
            return Ok("Comment added successfully!");
        }
        /// <summary>
        /// Deletes an existing comment.
        /// </summary>
        /// <param name="comment">The ID of the comment to delete.</param>
        /// <returns>
        /// Returns no content if the comment was successfully deleted.
        /// </returns>
        /// <response code="204">The comment was successfully deleted.</response>
        [HttpDelete("{commentId}")]
      
        public async Task<IActionResult> DeleteComment(int comment)
        {
            await _repository.DeleteCommentAsync(comment);

            return NoContent();

        }


    }
}
