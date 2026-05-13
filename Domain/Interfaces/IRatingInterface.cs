using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Interfaces
{
    public interface IRatingInterface
    {
        Task AddRatingAsync(Rating rating);

        Task<double> GetAverageRating(int bookId);

        Task<Rating> GetUserRatingAsync(int bookId, string userId);
    }
}
