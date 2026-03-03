using System;
using System.Collections.Generic;
using System.Text;
using Domain.Entities;

namespace Domain.Entities
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;

      
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int PublishedYear { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int AuthorId { get; set; }
        public int CategoryId { get; set; }
        public Author Author { get; set; } = null!;
        public Category Category { get; set; } = null!;
    }
}
