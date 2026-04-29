using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Interfaces
{
    public interface IFavorite
    {

        Task<IEnumerable<Favorite>> GetUserFavoriteAsync(string userID);


        Task AddToFavorite(Favorite favorite);

        Task RemoveFromFavorite(Favorite favorite);

        Task<bool> IsFavoriteAsync(string userId, int bookId);


    }
}
