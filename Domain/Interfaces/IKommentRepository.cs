using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Interfaces
{
    public interface IKommentRepository
    {
        Task<IEnumerable<Komment>> GetCommentsAsync(int bookId);
        Task AddCommentAsync(Komment komment);
        Task DeleteCommentAsync(int kommentId);
    }
}
