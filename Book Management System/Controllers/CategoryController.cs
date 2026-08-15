using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Book_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        /// <summary>
        /// Get all Categories
        /// </summary>
        /// <returns>Return all Categories</returns>
        [HttpGet]

        public async Task<IActionResult> GetAll()
        {
            var categories = await _categoryRepository.GetAllAsync();

            return Ok(categories);

        }
        /// <summary>
        /// Get a category by Id
        /// </summary>
        /// <param name="id">The ID of the category to retrieve</param>
        /// <returns>Return category if found</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult>GetById(int id)
        {
            var categories = await _categoryRepository.GetAsyncById(id);
            if (categories is null)
            {
                return NotFound();
            }
            return Ok(categories);

        }

        /// <summary>
        /// Creates a new category
        /// </summary>
        /// <param name="category">The category to be created</param>
        /// <returns>Returns the new created Category</returns>
        /// <response code="201">The category was successfully created.</response>
        [HttpPost]
        public async Task<IActionResult> Create(Category category)
        {
            await _categoryRepository.AddAsync(category);

            return CreatedAtAction(nameof(GetById), new { id = category.Id }, category);
        }

        /// <summary>
        /// Updates an existing Category
        /// </summary>
        /// <param name="id">Update the category by the given Id</param>
        /// <param name="category">The category to be updated</param>
        /// <returns>
        /// Returns the newly created category with a <see cref="CreatedAtActionResult"/> response.
        /// </returns>
        /// <response code="201">The category was successfully created.</response>
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id,Category category)

        {
            if (id != category.Id)
            {
                return BadRequest();
            }
            await _categoryRepository.UpdateAsync(category);

            return NoContent();
        }
        /// <summary>
        /// Deletes an existing Category
        /// </summary>
        /// <param name="id">The id of the category to be deleted</param>
        /// Returns <see cref="NoContentResult"/> if the category was successfully deleted.
        /// </returns>
        /// <response code="204">The category was successfully deleted.</response>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _categoryRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}
