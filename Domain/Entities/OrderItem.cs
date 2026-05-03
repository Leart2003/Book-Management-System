using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class OrderItem
    {

        public int Id { get; set; }

        public int OrderID { get; set; }

        public int BookId { get; set; }

        public int Quantity { get; set; }

        public decimal Price { get; set; }

        public Order? Order { get; set; }
        public Book? Book { get; set; }
    }
}
