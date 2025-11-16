using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimplyDriveAPI.Models;
using SimplyDriveAPI.Services;
using SimplyDriveAPI.Controllers;

namespace SimplyDriveAPI.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class QRController : Controller
    {


        private readonly AppDbContext _context;
        private readonly QRServices _qrServices;
        private readonly BookingService _bookingService;
        private readonly BookingsController _bookingsController;
        

        public QRController(QRServices qrServices, AppDbContext context, BookingService bookingService)
        {
            _bookingService = bookingService;
            _qrServices = qrServices;
            _context = context;
        }

        [HttpPost("generateQRCode")]
        public async Task<IActionResult> generateQRCode(int bookingID, string userID)
        {
            string passcode = QRServices.Generate(6);

            string qrString = $"{bookingID}@{userID}@{passcode}$";

            var qrCodeModel = new QRCodeModel
            {
                userid = userID,
                bookingid = bookingID,
                passcode = passcode,
                qr_string = qrString,
                date_expires = DateTime.UtcNow.AddDays(7),
                active = true
            };

            try
            {
                _context.QRCodeModel.Add(qrCodeModel);
                _context.SaveChanges();   // QR Code saved to database
                return Ok(new
                {
                    message = "QR Code generated successfully.",
                    qrCode = qrString
                });
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while generating the QR Code. {ex}");
            }
        }

        [HttpGet("getQRCode")] //Probably shouldn't have this in prod
        public async Task<IActionResult> returnQRCode(int bookingID)
        {
            var qrCode = await _context.QRCodeModel.FirstOrDefaultAsync(q => q.bookingid == bookingID && q.active == true);
            if (qrCode == null)
            {
                return NotFound(new { message = "QR Code not found for the given booking ID." });
            }
            return Ok(new
            {
                qrCode
            });
        }
        [HttpGet("VarifyQRCode")]
        public async Task<IActionResult> verifyQRCode(string userID, int bookingID, string QRpasscode)
        {
            var qrCode = await _context.QRCodeModel.FirstOrDefaultAsync(q => q.bookingid == bookingID && q.userid == userID && q.passcode == QRpasscode && q.active == true);


            if (qrCode == null)
            {
                return NotFound(new { message = "QR Code not valid." });
            }

            var bookingDetails = await _bookingService.GetDealershipBookingByID(bookingID);
            _bookingService.UpdateStatus(bookingID, BookingStatusEnum.onsite);

            return Ok(new
            {
                message = "QR Code valid.",
                qrCode,
                bookingDetails
            });
        }

    }
}
