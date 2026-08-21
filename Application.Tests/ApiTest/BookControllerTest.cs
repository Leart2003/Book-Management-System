using Application.Services;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;


namespace Application.Tests.ApiTest
{


    public class BookControllerTest
    {
        [Fact]
        public async Task GetAllBooksAsync_ReturnsAllBooks()
        { 
            var mockRepo = new Mock<IBookRepository>();
            mockRepo.Setup(r => r.GetBooksAsync()).ReturnsAsync(new List<Book>
            {
                new Book { Id = 62, Title = "Clean Code" },
                new Book { Id = 63, Title = "Clean Architecture" }
            });

            var service = new BookService(mockRepo.Object);

            var result = await service.GetAllBooksAsync();

           

        }
        [Fact]
        public async Task DeleteBookAsync()
        {
            var mockRepo = new Mock<IBookRepository>();
            var service = new BookService(mockRepo.Object);


            await service.DeleteBookAsync(1);
            mockRepo.Verify(r => r.DeleteAsync(1), Times.Once);

        }

        [Fact]

        public async Task GetBookById()
        {
            var mockRepo = new Mock<IBookRepository>();
            mockRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(new Book { Id = 1, Title = "Clean Code" });

            var service = new BookService(mockRepo.Object);
            var result = await service.GetBookByIdAsync(1);

            Assert.NotNull(result);
            Assert.Equal("Clean Code", result.Title);
        }
    }
}