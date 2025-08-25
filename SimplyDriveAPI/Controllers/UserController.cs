using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimplyDriveAPI.Models;
using System.Security.Claims;

namespace SimplyDriveAPI.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("Api/[controller]")]
    public class UserController : ControllerBase

    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("Whoami")]
        public IActionResult GetUserInfo()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;

            var userID = claimsIdentity?.FindFirst("sub")?.Value;
            var email = claimsIdentity?.FindFirst(ClaimTypes.Email)?.Value;
            var givenName = claimsIdentity?.FindFirst(ClaimTypes.GivenName)?.Value;
            var familyName = claimsIdentity?.FindFirst(ClaimTypes.Surname)?.Value;

            return Ok(new
            {
                UserID = userID,
                Email = email,
                FirstName = givenName,
                LastName = familyName
            });
        }

        [HttpGet("ActiveBookings")]
        public async Task<IActionResult> GetActiveBookings()
        {


            var claimsIdentity = User.Identity as ClaimsIdentity;
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;


            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User ID claim missing");

            var activeBookings = await _context.BookingData.Where(b => b.UserId == userId).ToListAsync();

            var response = activeBookings.Select(b => new
            {
                BookingId = b.BookingId,
                BookingDate = b.BookingDate,
                BookingTime = b.BookingTime,
                VehicleId = b.VehicleId,
                DealerId = b.DealerId,
                IsService = b.IsService,
                IsMot = b.IsMot,
                IsDiagnostics = b.IsDiagnostics,
                IsOtherJobType = b.IsOtherJobType,
                IsWarrenty = b.IsWarrenty,
                DealerReference = b.DealerReference
            });


            return Ok(response);


        }


    }
}