using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimplyDriveAPI.Models;
using System.Text.Json;

namespace SimplyDriveAPI.Controllers
{
    //[Authorize]
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
        public async Task<IActionResult> GetOwnedVehicles(string userID) 
        {

            var ownedVehiclesResult = await _context.Set<VehicleOwnersDataModel>().Where(v => v.userid == userID).ToListAsync();

            if (ownedVehiclesResult != null && ownedVehiclesResult.Count > 0)
            {
                // STEP 1: Get all vehicle IDs owned by the user
                var vehicleIds = ownedVehiclesResult.Select(v => v.vehicleid).ToList();

                // STEP 2: Return the Vehicle Details 
                var vehicles = await _context.Set<VehicleDataModel>()
                    .Where(v => vehicleIds.Contains(v.id))
                    .ToListAsync();

                return Ok(vehicles);
            }

            //TODO: USING THE USERID SEARCH THROUGH THE DATABASE FOR ALL VEHICLES THAT CORRISPOND TO THAT ID
            //TODO: THEN RETURN THE VEHICLE DETAILS FROM DETAILS DATABASE

            return NotFound(); //USER HAS NO VEHICLES!
        }


        [HttpPost("AddVehicle")]
        public async Task<IActionResult> AddVehicleToUser(string userID, string vehicleRegistration)
        {
            //CHECK TO SEE IF VEHICLE EXISTS IN CURRENT DATABASE
            var vehicleLookUpResult = await _context.Set<VehicleDataModel>()
                .FirstOrDefaultAsync(v => v.registration == vehicleRegistration);

            if (vehicleLookUpResult == null)
            {
                // TODO: IF IT DOESNT EXIST, GET THE DETAILS FROM AN EXERTNAL API AND SAVE DETAILS INTO THE DATABASE, AND THEN ASSOCIATE THE VEHICLE ID TO THE USER.
                return NotFound(new { message = "Vehicle not found in the database." });
            }

            // IF IT DOES EXIST, CHECK TO SEE IF THE USER ALREADY OWNS THE VEHCLE

            var alreadyOwned = await _context.Set<VehicleOwnersDataModel>().AnyAsync(vo => vo.userid == userID && vo.vehicleid == vehicleLookUpResult.id);

            if (alreadyOwned)
            {
                return BadRequest(new { message = "User already owns this vehicle." });
            }

            // IF THEY DONT, ASSOCIATE THE VEHICLE TO THE OWNER

            var vehicleOwner = new VehicleOwnersDataModel
            {
                userid = userID,
                vehicleid = vehicleLookUpResult.id
            };

            _context.VehicleOwners.Add(vehicleOwner);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Vehicle successfully added to user." });


        }

        [HttpDelete("RemoveVehicle")]
        public async Task<IActionResult> RemoveVehicleFromUser(string userID, int vehicleID)
        {
            // Find the record matching userID + vehicleID
            var vehicleOwner = await _context.VehicleOwners
                .FirstOrDefaultAsync(vo => vo.userid == userID && vo.vehicleid == vehicleID);

            if (vehicleOwner == null)
            {
                return NotFound(new { message = "Vehicle not found for this user." });
            }

            // Remove it from the DbSet
            _context.VehicleOwners.Remove(vehicleOwner);

            // Save changes
            await _context.SaveChangesAsync();

            return Ok(new { message = "Vehicle removed successfully." });
        }
    }
}
