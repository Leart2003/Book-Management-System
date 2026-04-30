using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Repository
{
    public class FavoriteRepository : IFavorite
    {

        private readonly ApplicationDbContext _dbContext;

        public FavoriteRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddToFavorite(Favorite favorite)
        {
          await _dbContext.Favorites.AddAsync(favorite);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Favorite>> GetUserFavoriteAsync(string userID)
        {
          return await _dbContext.Favorites.Include(f => f.Book)
                .Where(f => f.UserId == userID)
                .ToListAsync();
        }

        public async Task<bool> IsFavoriteAsync(string userId, int bookId)
        {
            return await _dbContext.Favorites
              .AnyAsync(f => f.UserId == userId && f.BookId == bookId);
        }

        public async Task RemoveFromFavorite(int favoriteId)
        {
            var favorites = await _dbContext.Favorites.FindAsync(favoriteId);

            if (favorites != null)
            {
                _dbContext.Favorites.Remove(favorites);
                await _dbContext.SaveChangesAsync();
            }
        }

       
    }
}
