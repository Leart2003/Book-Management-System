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
        /// <summary>
        /// EF Core implementation of <see cref="IAuthorRepository"/>.
        /// Handles all data access for <see cref="Author"/> entities using
        /// <see cref="ApplicationDbContext"/> as the underlying data source.
        /// </summary>
        public AuthorRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        /// <summary>
        /// Adds a new author to the database.
        /// </summary>
        /// <param name="author">The author entity to insert.</param>
        /// <remarks>
        /// Calls <c>SaveChangesAsync</c> immediately, so the insert is committed
        /// as soon as this method returns (no unit-of-work batching here).
        /// </remarks>
        public async Task AddAsync(Author author)
        {
            await _context.Authors.AddAsync(author);
            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Deletes the author with the given id, if one exists.
        /// </summary>
        /// <param name="id">The primary key of the author to delete.</param>
        /// <remarks>
        /// Does nothing (no exception thrown) if no author with the given id is found.
        /// This is a design choice — the caller doesn't need to check existence first,
        /// but it also means "not found" and "deleted" look the same from the outside.
        /// </remarks>
        public async Task DeleteAsync(int id)
        {
            var author = await GetByIdAsync(id);
            if (author is not null)
            {
                _context.Authors.Remove(author);
                await _context.SaveChangesAsync();
            }
        }


        /// <summary>
        /// Retrieves a single author by their primary key.
        /// </summary>
        /// <param name="id">The author's id.</param>
        /// <returns>
        /// The matching <see cref="Author"/>, or <c>null</c> if no author with that id exists.
        /// </returns>
        /// <remarks>
        /// Uses <c>FindAsync</c>, which first checks EF Core's change tracker before
        /// hitting the database — cheaper than a query if the entity is already tracked.
        /// </remarks>

        public async Task<Author?> GetByIdAsync(int id){
        
            return await _context.Authors.FindAsync(id);
        }
        /// <summary>
        /// Updates an existing author's data.
        /// </summary>
        /// <param name="author">The author entity with updated values.</param>
        /// <remarks>
        /// <c>Update</c> marks the entire entity as modified, not just the changed
        /// properties, so every column gets written even if only one field changed.
        /// Fine for a small entity like <see cref="Author"/>, but worth knowing for
        /// larger entities where you might want to attach + mark specific properties instead.
        /// </remarks>

        public async Task UpdateAsync(Author author)
        {
            _context.Authors.Update(author);
            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Retrieves every author in the database.
        /// </summary>
        /// <returns>A collection of all <see cref="Author"/> records.</returns>
        /// <remarks>
        /// No paging or filtering — fine for a small reference table like authors,
        /// but avoid this pattern on large tables since it loads everything into memory.
        /// </remarks>
        public async Task<IEnumerable<Author>> GetAllAsync()
        {
            return await _context.Authors.ToListAsync();
        }

        
    }
}
