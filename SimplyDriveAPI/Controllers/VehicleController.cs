using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimplyDriveAPI.Models;

namespace SimplyDriveAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("Api/[controller]")]
    public class VehicleController : Controller
    {
        private readonly AppDbContext _context;

        public VehicleController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("VehicleDetails")]
        public async Task<IActionResult> GetVehicleDetails(int VehicleID)
        {
            var vehicle = await _context.Set<VehicleDataModel>().FirstOrDefaultAsync(v => v.id == VehicleID);
            if (vehicle == null)
            {
                return NotFound();
            }
            return Ok(vehicle);
        }
    }
}
