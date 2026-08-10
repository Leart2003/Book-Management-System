using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Book_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private readonly IAuthorRepository _authorRepository;


        /// <summary>
        /// Initializes a new instance of the <see cref="AuthorController"/> class.
        /// </summary>
        /// <param name="authorRepository">
        /// Repository used to perform author-related operations.
        /// </param>
        public AuthorController(IAuthorRepository authorRepository)
        {
            _authorRepository = authorRepository;
        }

        /// <summary>
        /// Gets all book using GetAllAsync method from author repository
        /// </summary>
        /// <returns>Returns all Books</returns>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var authors = await _authorRepository.GetAllAsync();

            return Ok(authors); 
        }
        /// <summary>
        /// Get an author by Id
        /// </summary>
        /// <param name="id">Unique id of author</param>
        /// <returns>
        /// <response code="400">If author is null, not found</response>
        ///  /// <response code="200">If author is not null, author found</response>
        /// Returns the author with the given id</returns>

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBydId(int id)
        {
           var author = await _authorRepository.GetByIdAsync(id);
            if (author == null)
            {
                return NotFound();
            }

            return Ok(author);
        }
        /// <summary>
        ///  Creates a new author
        /// </summary>
        /// <param name="author"></param>
        /// <returns>The created author is returned</returns>
        [HttpPost]
        public async Task<IActionResult> Create(Author author)
        {
            await _authorRepository.AddAsync(author);
          return Ok(author);

        }
        /// <summary>
        /// Updates an existing author
        /// </summary>
        /// <param name="id">Find the author by the given Id</param>
        /// <param name="author">The updated author information</param>
        /// <returns>returns no contend even if author is updated</returns>
        [HttpPut]
        public async Task<IActionResult> Update(int id, Author author)
        {
            if (id != author.Id)
            {
                return BadRequest();
            }
            await _authorRepository.UpdateAsync(author);
            return NoContent();
        }

        /// <summary>
        /// Deletes an existing Author
        /// </summary>
        /// <param name="id">Unique id of author</param>
        /// <returns>No content if author is deleted succesfully</returns>
        /// /// <response code="204">The author was successfully deleted.</response>
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await _authorRepository.DeleteAsync(id);
            return NoContent();
        }

           


    }
}
