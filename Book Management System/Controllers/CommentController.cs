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

        public CommentController(IKommentRepository kommentRepository)
        {
            _repository = kommentRepository;
        }

        [HttpGet("{bookId}")]
        public async Task<IActionResult> GetBookComments(int bookId)
        {
            var comments = await _repository.GetCommentsAsync(bookId);

            return Ok(comments);
        }

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
        [HttpDelete("{commentId}")]
        public async Task<IActionResult> DeleteComment(int comment)
        {
            await _repository.DeleteCommentAsync(comment);

            return NoContent();

        }


    }
}
