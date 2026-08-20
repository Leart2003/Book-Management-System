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
            // Arrange
            var mockRepo = new Mock<IBookRepository>();
            mockRepo.Setup(r => r.GetBooksAsync()).ReturnsAsync(new List<Book>
            {
                new Book { Id = 62, Title = "Clean Code" },
                new Book { Id = 63, Title = "Clean Architecture" }
            });

            var service = new BookService(mockRepo.Object);

            // Act
            var result = await service.GetAllBooksAsync();

            // Assert

        }
    }
}