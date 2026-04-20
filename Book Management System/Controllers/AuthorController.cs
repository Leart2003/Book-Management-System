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


        public AuthorController(IAuthorRepository authorRepository)
        {
            _authorRepository = authorRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var authors = _authorRepository.GetAllAsync();

            return Ok(authors); 
        }

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
        [HttpPost]
        public async Task<IActionResult> Create(Author author)
        {
            await _authorRepository.AddAsync(author);
          return Ok(author);

        }
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

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await _authorRepository.DeleteAsync(id);
            return NoContent();
        }

           


    }
}
