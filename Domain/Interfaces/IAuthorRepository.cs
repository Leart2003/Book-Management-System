using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Interfaces
{
    public interface IAuthorRepository
    {
        Task<IEnumerable<Author>> GetAllAsync();

        Task<Author> GetByIdAsync(int id);

        Task AddAsync(Author author);

        Task UpdateAsync(Author author);

        Task DeleteAsync(int id);

    }
}
