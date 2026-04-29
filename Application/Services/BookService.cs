using Domain.Interfaces;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using Domain.Dtos;

namespace Application.Services
{
    public class BookService
    {
        private readonly IBookRepository _bookRepository;

        public BookService(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;

        }

        public async Task<IEnumerable<Book>> GetAllBooksAsync()
        {
            return await _bookRepository.GetBooksAsync();
        }

        public async Task<Book?> GetBookByIdAsync(int id)
        {
            return await _bookRepository.GetByIdAsync(id);
        }
        public async Task<Book?> CreateBook(BookDto bookDto)
        {
            string imageUrl = null;

            if (bookDto.ImageFile != null)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
                Directory.CreateDirectory(uploadsFolder);

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(bookDto.ImageFile.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await bookDto.ImageFile.CopyToAsync(stream);
                }

                imageUrl = $"/images/{fileName}";
            }

            var book = new Book()
            {
                Title = bookDto.Title,
                Description = bookDto.Description,
                Price = bookDto.Price,
                PublishedYear = bookDto.PublishedYear,
                AuthorId = bookDto.AuthorId,
                CategoryId = bookDto.CategoryId,
                ImageUrl = imageUrl


            };
            await _bookRepository.AddAsync(book);
            return book;
        }
        public async Task UpdateBookAsync(Book book)
        {
            await _bookRepository.UpdateAsync(book);
        }

        public async Task DeleteBookAsync(int id)
        {
            await _bookRepository.DeleteAsync(id);
        }
    }
}
