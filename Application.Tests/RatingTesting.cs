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

    }
}
