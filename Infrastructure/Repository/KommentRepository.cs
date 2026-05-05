using Domain.Entities;
using Domain.Interfaces;
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

        public Task<IEnumerable<Komment>> GetCommentsAsync(int bookId)
        {
            throw new NotImplementedException();
        }
    }
}
