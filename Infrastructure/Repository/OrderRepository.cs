using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public OrderRepository(ApplicationDbContext dbContext)
        {
         
            _dbContext = dbContext;
        }
        public async Task<Order> CreateOrderAsync(Order order)
        {
            await _dbContext.AddAsync(order);
            await _dbContext.SaveChangesAsync();
            return order;
        }

        public async Task<Order?> GetOrderByIdAsync(int orderId)
        {
            return await _dbContext.Orders
                  .Include(o => o.OrderItems)
                  .ThenInclude(oI => oI.Book)
                  .FirstOrDefaultAsync(o => o.Id == orderId);
        }

        public async Task<IEnumerable<Order>> GetUserOrdersAsync(string userId)
        {
            return await _dbContext.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Book)
                .Where(o => o.UserId == userId)
                .ToListAsync();

        }

        public async Task UpdateOrderStatusAsync(int orderId, string status)
        {
            var order = await _dbContext.Orders.FindAsync();
            if (order != null)
            {
                order.Status = status;
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
