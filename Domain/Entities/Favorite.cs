using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class Favorite
    {
        public int Id { get; set; }

        public string UserId { get; set; } = string.Empty;
        public int BookId { get; set; }


        public User? User { get; set; }
        public Book? Book { get; set; }
    }
}
