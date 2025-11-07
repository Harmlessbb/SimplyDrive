using Microsoft.AspNetCore.Mvc;
using SimplyDriveAPI.Models;
using SimplyDriveAPI.Services;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;

namespace SimplyDriveAPI.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class BookingsController : Controller
    {
        private readonly AppDbContext _context;
        private readonly DealerServices _dealerServices;

        public BookingsController(DealerServices dealerServices, AppDbContext context)
        {
            _dealerServices = dealerServices;
            _context = context;
        }

        [HttpPost("CreateBooking")]
        public async Task<IActionResult> CreateBooking(string userID, int dealerID, int vehicleID, DateOnly date, TimeOnly time, int timeslot, int[] jobcodes, double totallabourtime, BookingStatusEnum bookingStatus, string reference)
        {
            var dealer = await _context.DealershipData.FindAsync(dealerID);
            if (dealer == null)
            {
                return NotFound(new { message = "Dealership not found." });
            }

            var bookingsModel = new BookingDataModel
            {
                userid = userID,
                dealerid = dealerID,
                vehicleid = vehicleID,
                date = DateTime.SpecifyKind(date.ToDateTime(new TimeOnly(0, 0)), DateTimeKind.Utc),
                time = time.ToTimeSpan(),
                timeslot = timeslot,
                jobcodes = jobcodes,
                totallabour = totallabourtime,
                status = BookingStatusEnum.upcoming,
                reference = reference
            };

            try
            {
                _context.BookingData.Add(bookingsModel);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Booking added successfully." });

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"An error occurred while adding the Brand. {ex}" });
            }
        }

        [HttpDelete("DeleteBooking")]
        public async Task<IActionResult> DeleteBooking(int bookingID)
        {
            var booking = await _context.BookingData.FindAsync(bookingID);
            if (booking == null)
            {
                return NotFound(new { message = "Booking not found." });
            }
            try
            {
                _context.BookingData.Remove(booking);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Booking deleted successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"An error occurred while deleting the booking. {ex}" });
            }

        }

        [HttpGet("DealerBookings")]
        public async Task<IActionResult> GetDealershipBookings(int dealerID) 
        { 
            var dealerBookingsReferenceData = await _context.Set<BookingDataModel>().Where(b => b.dealerid == dealerID).ToListAsync();

            var status = dealerBookingsReferenceData.Select(v => v.status).ToList();
            var vehicleIds = dealerBookingsReferenceData.Select(v => v.vehicleid).ToList();

            var vehicles = await _context.Set<VehicleDataModel>()
                .Where(v => vehicleIds.Contains(v.id))
                .ToListAsync();

            var vehicleRegistrations = vehicles.Select(v => v.registration).ToList();

            var dealerBookingsMapped = dealerBookingsReferenceData.Select(b => new
            {
                b.bookingid,
                b.userid,
                b.dealerid,
                b.vehicleid,
                b.date,
                b.time,
                b.timeslot,
                b.jobcodes,
                b.totallabour,
                b.status,
                b.reference,
                registration = vehicles.FirstOrDefault(v => v.id == b.vehicleid)?.registration
            }).ToList();

            return Ok(dealerBookingsMapped);


        }

    }


}
