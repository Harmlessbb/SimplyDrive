using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimplyDriveAPI.Models;

namespace SimplyDriveAPI.Services
{
    public class BookingService
    {
        private readonly AppDbContext _context;

        public BookingService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<object> GetDealershipBookingByID(int bookingID)
        {
            var booking = await _context.Set<BookingDataModel>()
                .FirstOrDefaultAsync(b => b.bookingid == bookingID);

            if (booking == null)
                return null;

            var vehicle = await _context.Set<VehicleDataModel>()
                .FirstOrDefaultAsync(v => v.id == booking.vehicleid);

            return new
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
        }
    }
}
