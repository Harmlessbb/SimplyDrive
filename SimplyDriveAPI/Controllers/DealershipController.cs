using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimplyDriveAPI.Models;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace SimplyDriveAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("Api/[controller]")]

    public class DealershipController : Controller
    {

        private readonly AppDbContext _context;

        public DealershipController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("DealershipData")]
        public async Task<IActionResult> GetDealershipDetails(int dealerID)
        {


            var claimsIdentity = User.Identity as ClaimsIdentity;
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;


            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User ID claim missing");

            var dealerships = await _context.DealershipData.FirstOrDefaultAsync(d => d.id == dealerID);
            return Ok(dealerships);


        }
    }
}
