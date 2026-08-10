using Domain.Dtos;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Book_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        /// <summary>
        /// Inject UserManager from ASP.NET Core identity(Depency injection)
        /// </summary>
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        public AuthController(IConfiguration configuration, UserManager<User> userManager)
        {
            _configuration = configuration;
            _userManager = userManager;
        }


        /// <summary>
        /// Register a user(Post) into the databsse
        /// </summary>
        /// <param name="registerDto"></param>
        /// <returns>
        /// return a response if the user is register code 200(Ok), if not response code="400"</returns>
        /// /// <response code="200">The user was successfully registered.</response>
        /// <response code="400">The registration data is invalid or the user could not be created.</response>
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {

            var user = new User
            {
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                UserName = registerDto.Email,
                Email = registerDto.Email,

            };
            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            return Ok("User register succesfully");
        }
        /// <summary>
        /// Login into the app by using their email adress and a password
        /// Generate JWT token if the credentials are valid
        /// </summary>
        /// <param name="loginDto">
        /// loginDto contains the users email and password</param>
        /// Checks if user is null the system will return an answer user not found
        /// Check if the user insterted the right password, if the password is wrong the system will return an answer(Wrong password)
        /// <returns>If validPass the system will generate a JWt token and the user will login into the appliction</returns>

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user is null)
                return Ok("User not found!");

            var validPass = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if (!validPass)
                return Ok("Wrong password!");

            var token = GenerateJwtToken(user);
            return Ok(new { token });
        }

        private String GenerateJwtToken(User user)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var secret = jwtSettings["Secret"];

            var claims = new[]
          {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.Email, user.Email!),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: creds);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }



    }
}
