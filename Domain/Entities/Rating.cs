using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class Rating
    {
        public int Id { get; set; }

        public int BookId { get; set; }

        public string? UserId { get; set; }

        public int Stars { get; set; }

        public DateTime CreatedAt { get; set; }

        public Book? Book { get; set; }
        public User? User { get; set; }



    }
}
