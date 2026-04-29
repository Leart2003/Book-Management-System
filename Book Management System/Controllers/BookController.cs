using Application.Services;
using Domain.Dtos;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Application.Services;

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

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var books = await _bookService.GetAllBooksAsync();

            return Ok(books);
            
        }
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
        [HttpPost]
        public async Task<IActionResult> Create([FromForm]BookDto bookDto)
        {
            var book = await _bookService.CreateBook(bookDto);
            return CreatedAtAction(nameof(GetById), new { id = book.Id }, book);
        }
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
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _bookService.DeleteBookAsync(id);
            return NoContent();
        }

    }
}
