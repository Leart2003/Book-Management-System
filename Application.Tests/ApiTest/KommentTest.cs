using Application.Services;
using Domain.Entities;
using Domain.Interfaces;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Tests.ApiTest
{
    public class KommentTest
    {
        [Fact]
        public async Task GetBookCommentsAll()
        {
            var mockRepo = new Mock<IKommentRepository>();
            mockRepo.Setup(r => r.GetCommentsAsync(1)).ReturnsAsync(new List<Komment>
            {
                new Komment { Id = 1, BookId = 1, Content = "Great book!" },
                new Komment { Id = 2, BookId = 1, Content = "Loved it." }
            });

            var service = new KommentService(mockRepo.Object);

            var result = await service.GetBookCommentsAsync(1);

            Assert.Equal(2, result.Count());
        }
        [Fact]
        public async Task AddComment()
        {
            
            var mockRepo = new Mock<IKommentRepository>();
            var service = new KommentService(mockRepo.Object);

           
            await service.AddCommentAsync("user1", 1, "Nice read");

            mockRepo.Verify(r => r.AddCommentAsync(It.IsAny<Komment>()), Times.Once);
        }
       
        public async Task DeleteCommentAsync_CallsRepositoryDeleteCommentAsync()
        {
           
            var mockRepo = new Mock<IKommentRepository>();
            var service = new KommentService(mockRepo.Object);

            await service.DeleteCommentAsync(1);

            
            mockRepo.Verify(r => r.DeleteCommentAsync(1), Times.Once);
        }



    }
}

    

