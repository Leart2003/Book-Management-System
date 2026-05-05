using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Repository
{
    public class KommentRepository : IKommentRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public KommentRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task AddCommentAsync(Komment komment)
        {
            await _dbContext.Comments.AddAsync(komment);
           await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteCommentAsync(int kommentId)
        {
            var comment =  await _dbContext.Comments.FindAsync(kommentId);
            if (comment != null)
            {
                 _dbContext.Comments.Remove(comment);
                await _dbContext.SaveChangesAsync();



            }
          
        }

        public async Task<IEnumerable<Komment>> GetCommentsAsync(int bookId)
        {
            return await _dbContext.Comments
                 .Include(c => c.User)
                 .Where(c => c.BookId == bookId)
                 .OrderByDescending(c => c.CreatedAt)
                 .ToListAsync();

        }
    }
}
