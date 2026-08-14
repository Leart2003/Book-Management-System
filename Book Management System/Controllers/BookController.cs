using Application.Services;
using Domain.Dtos;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Book_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookService _bookService;

        public BookController(BookService bookService)
        {
            _bookService = bookService;
        }

        /// <summary>
        /// Get all books fron repository
        /// </summary>
        /// <returns>Return all existing books</returns>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var books = await _bookService.GetAllBooksAsync();

            return Ok(books);
            
        }
        /// <summary>
        /// Gets a book by bookId
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Returns the request according to bookId</returns>
        [HttpGet("{id}")]

        public async Task<IActionResult> GetById(int id)
        {
            var book = await _bookService.GetBookByIdAsync(id);

            if (book is null)
            {
                return NotFound();   
            }

            return Ok(book);

        }
        /// <summary>
        /// Create a book new book
        /// </summary>
        /// <param name="bookDto">The data required to create the book.</param>
        /// <returns>Return the newly created book</returns>
        /// /// <response code="201">The book was successfully created.</response>

        [HttpPost]
        public async Task<IActionResult> Create([FromForm]BookDto bookDto)
        {
            var book = await _bookService.CreateBook(bookDto);
            return CreatedAtAction(nameof(GetById), new { id = book.Id }, book);
        }

        /// <summary>
        /// Updates an existing book.
        /// </summary>
        /// <param name="id">The ID of the book to update</param>
        /// <param name="book">The updated book information</param>
        /// <returns>Return no content
        /// </returns>
        /// /// <response code="204">The book was successfully updated.</response>
        /// <response code="400">The ID in the URL does not match the book ID.</response>
        [HttpPut("{id}")]
        public async Task<IActionResult> Update (int id, Book book)
        {
            if (id != book.Id)
            {
                return BadRequest();
            }
            await _bookService.UpdateBookAsync(book);
            return NoContent();
        }
        /// <summary>
        ///  Deletes an existing book.
        /// </summary>
        /// <param name="id">The ID of the book to delete.</param>
        /// <returns>
        /// Returns <see cref="NoContentResult"/> if the book was successfully deleted.
        /// </returns>
        /// <response code="204">The book was successfully deleted.</response>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _bookService.DeleteBookAsync(id);
            return NoContent();
        }

    }
}
