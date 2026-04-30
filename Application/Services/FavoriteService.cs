using Domain.Entities;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;


namespace Application.Services
{
    public class FavoriteService
    {
        private readonly IFavorite _favoriteRepository;

        public FavoriteService(IFavorite favorite)
        {
            _favoriteRepository = favorite;
        }

        public async Task<IEnumerable<Favorite>> GetUserFavorite(string userId)
        {
            return await _favoriteRepository.GetUserFavoriteAsync(userId);
        }

        public async Task AddToFavoriteAsync(string userId, int bookId)
        {
            var alreadyFavorite = await _favoriteRepository.IsFavoriteAsync(userId, bookId);

            if (alreadyFavorite)
            {
               return;
            }
            var favorite = new Favorite
            {
                UserId = userId,
                BookId = bookId
            };
            await _favoriteRepository.AddToFavorite(favorite);
        }
        public async Task RemoveFavorite(int favoriteId)
        {
            await _favoriteRepository.RemoveFromFavorite(favoriteId);
        }

        public async Task<bool> IsFavoriteAsync(string userId, int bookId)
        {
            return await _favoriteRepository.IsFavoriteAsync(userId, bookId);
        }
    }
}
