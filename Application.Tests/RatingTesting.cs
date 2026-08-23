using Application.Services;
using Domain.Interfaces;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using Domain.Entities;


namespace Application.Tests
{
    public class RatingTesting
    {
        [Fact]
       
        public async Task RateBookAsync_CallsRepositoryAddRatingAsync_WhenStarsAreValid()
        {
            var mockRepo = new Mock<IRatingInterface>();
            var service = new RatingService(mockRepo.Object);

            
            await service.RateBookAsync(1, "user1", 4);

         
            mockRepo.Verify(r => r.AddRatingAsync(It.IsAny<Rating>()), Times.Once);
        }

        [Fact]
        public async Task RateBookAsync_ThrowsArgumentException_WhenStarsTooLow()
        {
           
            var mockRepo = new Mock<IRatingInterface>();
            var service = new RatingService(mockRepo.Object);

            await Assert.ThrowsAsync<ArgumentException>(() =>
                service.RateBookAsync(1, "user1", 0));
        }

        [Fact]
        public async Task GetAverageRatingAsync()
        {
        
            var mockRepo = new Mock<IRatingInterface>();
            mockRepo.Setup(r => r.GetAverageRating(1)).ReturnsAsync(4.5);

            var service = new RatingService(mockRepo.Object);

            var result = await service.GetAverageRatingAsync(1);

            Assert.Equal(4.5, result);
        }

    }
}
