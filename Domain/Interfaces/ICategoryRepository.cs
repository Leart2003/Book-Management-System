using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Interfaces
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAllAsync();
        Task<Category> GetAsyncById(int id);

        Task AddAsync(Category category);

        Task UpdateAsync(Category category);

        Task DeleteAsync(int id);
    }
}
