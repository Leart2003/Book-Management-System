using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Domain.Entities;
using Domain.Interfaces;

namespace Book_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;

        public BookController(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var books = await _bookRepository.GetBooksAsync();

            return Ok(books);
            
        }
        [HttpGet("{id}")]

        public async Task<IActionResult> GetById(int id)
        {
            var book = await _bookRepository.GetByIdAsync(id);

            if (book is null)
            {
                return NotFound();   
            }

            return Ok(book);

        }
        [HttpPost]
        public async Task<IActionResult> Create(Book book)
        {
            await _bookRepository.AddAsync(book);

            return CreatedAtAction(nameof(GetById), new { id = book.Id }, book);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update (int id, Book book)
        {
            if (id != book.Id)
            {
                return BadRequest();
            }
            await _bookRepository.UpdateAsync(book);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _bookRepository.DeleteAsync(id);
            return NoContent();
        }

    }
}
