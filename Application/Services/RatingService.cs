using Domain.Entities;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
 

namespace Application.Services
{
    public class RatingService 
    {
        private readonly IRatingInterface _ratingInterface;


        public RatingService(IRatingInterface ratingInterface)
        {
            _ratingInterface = ratingInterface;

        }

        public async Task RateBookAsync(int bookId, string userId, int stars)
        {
            if (stars <1 || stars >5)
            {
                throw new ArgumentException("Star rating must be between 1 and 5");


            }
            var rating = new Rating
            {
                BookId = bookId,
                UserId = userId,
                Stars = stars,
                CreatedAt = DateTime.Now,
            };
            await _ratingInterface.AddRatingAsync(rating);
        }
        public async Task<double> GetAverageRatingAsync(int bookId)
        {
            return await _ratingInterface.GetAverageRating(bookId);
        }
    }
}
