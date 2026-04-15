using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Repository
{
    public class CategoriesRepository : ICategoryRepository

        
    {
        private readonly ApplicationDbContext _context;
        public CategoriesRepository(ApplicationDbContext context)
        {
         _context = context;   
        }
        public async Task AddAsync(Category category)
        {
            await _context.Categories.AddAsync(category);
        }

        public Task DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await _context.Categories.ToListAsync();
        }

        public Task<Category> GetAsyncById(int id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(Category category)
        {
            throw new NotImplementedException();
        }
    }
}
