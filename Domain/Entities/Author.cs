using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class Author
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;

        // Navigation Property
        public int AuthorId { get; set; }
        public int CategoryId { get; set; }

        // Navigation Properties - make them nullable with ?
        public Author? author { get; set; }
        public Category? Category { get; set; }
        public ICollection<Book> Books { get; set; } = new List<Book>();
    }
}
