using Domain.Entities;
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
        private readonly KommentRepository _repository;

        public CommentController(KommentRepository kommentRepository)
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

        public async Task<IActionResult> PostComment(Komment komment)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }
            await _repository.AddCommentAsync(komment);
            return Ok("Comment added succesfully");
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteComment(int comment)
        {
            await _repository.DeleteCommentAsync(comment);

            return NoContent();

        }


    }
}
