using Microsoft.AspNetCore.Mvc;
using SimplyDriveAPI.Models;
using SimplyDriveAPI.Services;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Razor.TagHelpers;
using System;

namespace SimplyDriveAPI.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class BookingsController : Controller
    {
        private readonly AppDbContext _context;
        private readonly DealerServices _dealerServices;
        private readonly QRServices _qrServices;


        public BookingsController(DealerServices dealerServices, AppDbContext context, QRServices qrServices, BookingService bookingService)
        {
            _qrServices = qrServices;
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

            // Core booking model creation6a
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
                await _context.SaveChangesAsync();   // Booking saved to database, next we want to generate the QR code

                int bookingId = bookingsModel.bookingid;

                await _qrServices.generateQRCode(bookingId, userID);

                return Ok(new 
                {
                    message = "Booking added successfully." ,
                    bookingId = bookingId
                    
                });

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


        [HttpGet("BookingsByID")]
        public async Task<IActionResult> GetDealershipBookingByID(int bookingID)
        {
            var booking = await _context.Set<BookingDataModel>()
                .FirstOrDefaultAsync(b => b.bookingid == bookingID);

            if (booking == null)
                return NotFound(new { message = "Booking not found." });

            var vehicle = await _context.Set<VehicleDataModel>()
                .FirstOrDefaultAsync(v => v.id == booking.vehicleid);

            var result = new
            {
                booking.bookingid,
                booking.userid,
                booking.dealerid,
                booking.vehicleid,
                booking.date,
                booking.time,
                booking.timeslot,
                booking.jobcodes,
                booking.totallabour,
                booking.status,
                booking.reference,
                registration = vehicle?.registration
            };

            return Ok(result);
        }

        [HttpGet("BookingsByStatus")]
        public async Task<IActionResult> GetDealershipBookingByStatus(int? dealerID, BookingStatusEnum bookingStatus)
        {
            try
            {
                List<BookingDataModel> bookingsByStatus;

                if (dealerID is not null)
                {
                    bookingsByStatus = await _context.Set<BookingDataModel>()
                        .Where(b => b.dealerid == dealerID && b.status == bookingStatus)
                        .ToListAsync();
                }
                else
                {
                    bookingsByStatus = await _context.Set<BookingDataModel>()
                        .Where(b => b.status == bookingStatus)
                        .ToListAsync();
                }

                if (!bookingsByStatus.Any())
                    return NotFound(new { message = "No bookings found." });

                var results = new List<object>();

                foreach (var booking in bookingsByStatus)
                {
                    var vehicle = await _context.Set<VehicleDataModel>()
                        .FirstOrDefaultAsync(v => v.id == booking.vehicleid);

                    results.Add(new
                    {
                        booking.bookingid,
                        booking.userid,
                        booking.dealerid,
                        booking.vehicleid,
                        booking.date,
                        booking.time,
                        booking.timeslot,
                        booking.jobcodes,
                        booking.totallabour,
                        booking.status,
                        booking.reference,
                        registration = vehicle?.registration
                    });
                }

                return Ok(results);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"An error occurred while retrieving bookings. {ex.Message}" });
            }
        }




        [HttpPut("UpdateStatus")]
        public async Task<IActionResult> UpdateStatus(int bookingID, BookingStatusEnum newStatus)
        {
            var booking = await _context.BookingData.FindAsync(bookingID);

            if (booking == null)
            {
                return NotFound(new { message = "Booking not found." });
            }

            try
            {
                booking.status = newStatus;
                _context.BookingData.Update(booking);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Booking status updated successfully.",
                    bookingID = booking.bookingid,
                    newStatus = booking.status.ToString()
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"An error occurred while updating the booking status. {ex.Message}" });
            }
        }

    }


}
