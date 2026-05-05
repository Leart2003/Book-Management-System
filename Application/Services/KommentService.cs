using Domain.Entities;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Services
{
    public class KommentService
    {
        private readonly IKommentRepository _repository;

        public KommentService(IKommentRepository kommentRepository)
        {
            _repository = kommentRepository;
        }

        public async Task<IEnumerable<Komment>> GetBookCommentsAsync(int bookId)
        {
            return await _repository.GetCommentsAsync(bookId);
        }

        public async Task AddCommentAsync(string userId, int bookId, string content)
        {
            var comment = new Komment
            {
                UserId = userId,
                BookId = bookId,
                Content = content,
                CreatedAt = DateTime.UtcNow
            };

            await _repository.AddCommentAsync(comment);

        }
        public async Task DeleteCommentAsync(int commentId)
        {
            await _repository.DeleteCommentAsync(commentId);
        }

    }
}
