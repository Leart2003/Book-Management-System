using Domain.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Dtos
{
    public class BookDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
  
        public decimal Price { get; set; }
        public int PublishedYear { get; set; }
        public IFormFile? ImageFile { get; set; }
        public int AuthorId { get; set; }
       
        public int CategoryId { get; set; }

        // Image file
        public Author? Author { get; set; }
        public Category? Category { get; set; }
  
    }
}
