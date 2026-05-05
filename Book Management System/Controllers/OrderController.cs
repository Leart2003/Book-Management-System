using Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Book_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]


    public class OrderController : ControllerBase

    {
        private readonly OrderService _orderService;

        public OrderController(OrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserOrders() 
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (User == null)
            {
                return Unauthorized();
            }
            var order = await _orderService.GetUserOrderAsync(userId);

            return Ok (order);
        }

        [HttpGet("{orderId}")]

        public async Task<IActionResult> GetOrderID(int orderId)
        {
            var order = await _orderService.GetOrderByIdAsync(orderId);

            return Ok(order);
        }
        [HttpPost]

        public async Task<IActionResult> CreateOrder(List<int> bookIds)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }
            var order = await _orderService.CreateOrderAsync(userId, bookIds);
            return CreatedAtAction(nameof(GetOrderID), new { orderId = order.Id }, order);
        }
        [HttpPut("{orderId}/status")]
        public async Task<IActionResult> UpdateOrderStatus(int orderId, string status)
        {
            await _orderService.UpdateOrderStatusAsync(orderId, status);
            return NoContent();
        }
    }
}
