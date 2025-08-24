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

        [HttpGet("OwnedVehciles")]
        public async Task<IActionResult> GetOwnedVehicles() 
        {
            //TODO: USING THE USERID SEARCH THROUGH THE DATABASE FOR ALL VEHICLES THAT CORRISPOND TO THAT ID
            //TODO: THEN RETURN THE VEHICLE DETAILS FROM DETAILS DATABASE USING THAT ID
            return null;
        }

        [HttpPost("AddVehicle")]
        public async Task<IActionResult> AddVehicleToUser()
        {
            //TODO: CHECK TO SEE IF VEHICLE EXISTS IN DATABASE BY SEARCHING REGISTRATION
            //TODO: IF IT DOES, GET THE ID AND PUT IT NEXT TO THE USER ID IN THE TABLE 
            //TODO: IF IT DOESNT, SEND A REQUEST TO THE VES API FOR THE VEHICLE DETAILS AND ADD IT TO THE DATABASE
            //TODO: AND THEN ADD THE NEWLY CREATED VEHICLE ID TO THE USER IN THE OWNERSHIP DATABASE

            return null;
        }

        [HttpDelete("RemoveVehicle")]
        public async Task<IActionResult> RemoveVehicleFromUser()
        {
            //TODO: FIND THE VEHICLE ID + USER ID INSANCE AND REMOVE IT 
            return null;
        }
    }
}
