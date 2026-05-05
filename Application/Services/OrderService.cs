using System;
using System.Collections.Generic;
using System.Text;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{

    public class OrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IBookRepository _bookRepository;

        public OrderService(IOrderRepository orderRepository, IBookRepository bookRepository)
        {
            _orderRepository = orderRepository;
            _bookRepository = bookRepository;

        }

        public async Task<IEnumerable<Order>> GetUserOrderAsync(string userID)
        {
            return await _orderRepository.GetUserOrdersAsync(userID);


        }

        public async Task<Order?> GetOrderByIdAsync(int orderId)
        {
            return await _orderRepository.GetOrderByIdAsync(orderId);
        }

        public async Task<Order> CreateOrderAsync(string userId, List<int> bookIds)
        {
            decimal totalPrice = 0;
            var orderItems = new List<OrderItem>();

            foreach (var bookId in bookIds)
            {
                var book = await _bookRepository.GetByIdAsync(bookId);

                if (book == null)
                {
                    continue;
                }

                totalPrice += book.Price;

                orderItems.Add(new OrderItem
                {


                    BookId = bookId,
                    Price = book.Price,
                    Quantity = 1
                });
            }

                var order = new Order
                {
                    UserId = userId,
                    OrderDate = DateTime.Now,
                    TotalPrice = totalPrice,
                    Status = "Pending",
                    OrderItems = orderItems

                };
                return await _orderRepository.CreateOrderAsync(order);
            

        }
        public async Task UpdateOrderStatusAsync(int orderId, string status)
        {
            await _orderRepository.UpdateOrderStatusAsync(orderId, status);
        }
    }
   

}

