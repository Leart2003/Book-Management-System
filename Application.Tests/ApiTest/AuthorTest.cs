using Book_Management_System.Controllers;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Tests.ApiTest
{
    public class AuthorTest
    {
        [Fact]
        public async Task GetAllAuthorTest()
        {
            var mockRepo = new Mock<IAuthorRepository>();
            mockRepo.Setup(r => r.GetAllAsync()).ReturnsAsync(new List<Author>
            {
                new Author { Id = 1, FirstName = "George Orwell" },
                new Author { Id = 2, FirstName = "Isaac Asimov" }
            });
            var controller = new AuthorController(mockRepo.Object);
            var result = await controller.GetAll();

            var okResult = Assert.IsType<OkObjectResult>(result);
            var authors = Assert.IsAssignableFrom<IEnumerable<Author>>(okResult.Value);
            Assert.Equal(2, authors.Count());
        }
        [Fact]
        public async Task GetAuthorById()
        {
         
            var mockRepo = new Mock<IAuthorRepository>();
            mockRepo.Setup(r => r.GetByIdAsync(999)).ReturnsAsync((Author?)null);

            var controller = new AuthorController(mockRepo.Object);

          
            var result = await controller.GetBydId(999);

         
            Assert.IsType<NotFoundResult>(result);
        }
        [Fact]

        public async Task Delete_ReturnsNoContent()
        {
            
            var mockRepo = new Mock<IAuthorRepository>();
            var controller = new AuthorController(mockRepo.Object);

         
            var result = await controller.Delete(1);

            
            Assert.IsType<NoContentResult>(result);
            mockRepo.Verify(r => r.DeleteAsync(1), Times.Once);
        }
    }

}
