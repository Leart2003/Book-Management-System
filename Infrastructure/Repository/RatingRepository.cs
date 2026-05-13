using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Repository
{
    public class RatingRepository : IRatingInterface
    {
        private readonly ApplicationDbContext _context;

        public RatingRepository(ApplicationDbContext context)
        {
            _context = context;

        }
        public async Task AddRatingAsync(Rating rating)
        {
            var existing = await GetUserRatingAsync(rating.BookId, rating.UserId);


            if (existing != null)
            {
                existing.Stars = rating.Stars;
                existing.CreatedAt = rating.CreatedAt;

            }
            else
            {
                await _context.Rating.AddRangeAsync(rating);
                
            }
            await _context.SaveChangesAsync();
        }

        public async Task<double> GetAverageRating(int bookId)
        {
            var ratings = await _context.Rating
            .Where(r => r.BookId == bookId)
            .ToListAsync();
            

            if (!ratings.Any()) return 0;
            return Math.Round(ratings.Average(r => r.Stars), 1);
        }

        public async Task<Rating> GetUserRatingAsync(int bookId, string userId)
        {
            return await _context.Rating
               .FirstOrDefaultAsync(r => r.BookId == bookId && r.UserId == userId);

        }
    }
}
