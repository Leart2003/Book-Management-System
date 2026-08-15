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
        /// <summary>
        /// Get all user's orders
        /// </summary>
        /// <returns>Returns all orders made by the user if authenticated, if not authenticated returns Unauthorized</returns>

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
        /// <summary>
        /// Get an order by Id
        /// </summary>
        /// <param name="orderId">The id of order to be retrived</param>
        /// <returns>returns the order</returns>
        [HttpGet("{orderId}")]

        public async Task<IActionResult> GetOrderID(int orderId)
        {
            var order = await _orderService.GetOrderByIdAsync(orderId);

            return Ok(order);
        }
        /// <summary>
        /// Creates a new order for the currently authenticated user.
        /// </summary>
        /// <param name="bookIds">A list of book IDs to include in the order.</param>
        /// <returns>Returns the newly created order, or <see cref="UnauthorizedResult"/> if the user is not authenticated.</returns>
        /// /// <response code="201">The order was successfully created.</response>
        /// <response code="401">The user is not authenticated.</response>
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
        /// <summary>
        /// Updates the status of the user's order
        /// </summary>
        /// <param name="orderId">The id of the order's status to be updated</param>
        /// <param name="status"></param>
        /// Returns <see cref="NoContentResult"/> if the order status was successfully updated.
        /// </returns>
        /// <response code="204">The order status was successfully updated.</response>
        [HttpPut("{orderId}/status")]
        public async Task<IActionResult> UpdateOrderStatus(int orderId, string status)
        {
            await _orderService.UpdateOrderStatusAsync(orderId, status);
            return NoContent();
        }
    }
}
