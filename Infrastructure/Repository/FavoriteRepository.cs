using Domain.Entities;
using Domain.Interfaces;
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
        }

        public Task<IEnumerable<Favorite>> GetUserFavoriteAsync(string userID)
        {
            throw new NotImplementedException();
        }

        public Task<bool> IsFavoriteAsync(string userId, int bookId)
        {
            throw new NotImplementedException();
        }

        public Task RemoveFromFavorite(Favorite favorite)
        {
            throw new NotImplementedException();
        }
    }
}
