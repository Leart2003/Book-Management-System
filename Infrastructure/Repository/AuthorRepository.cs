using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Repository
{
    public class AuthorRepository : IAuthorRepository
       
    {
        private readonly ApplicationDbContext _context;
        public AuthorRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task AddAsync(Author author)
        {
            await _context.Authors.AddAsync(author);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var author = await GetByIdAsync(id);
            if (author is not null)
            {
                _context.Authors.Remove(author);
                await _context.SaveChangesAsync();
            }
        }

      


        public async Task<Author?> GetByIdAsync(int id){
        
            return await _context.Authors.FindAsync(id);
        }

        public async Task UpdateAsync(Author author)
        {
            _context.Authors.Update(author);
            await _context.SaveChangesAsync();
        }

        async Task<IEnumerable<Author>> IAuthorRepository.GetAllAsync()
        {
            return await  _context.Authors.ToListAsync();
        }
    }
}
