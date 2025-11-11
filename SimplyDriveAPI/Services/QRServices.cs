using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;
using SimplyDriveAPI.Models;
using System.Security.Cryptography;
using System.Text;


namespace SimplyDriveAPI.Services
{
    public class QRServices
    {

        private readonly AppDbContext _context;

        public QRServices(AppDbContext context)
        {
            _context = context;
        }

        private const string Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        public static string Generate(int length = 6)
        {
            var stringBuilder = new StringBuilder(length);
            using (var rng = RandomNumberGenerator.Create())
            {
                var buffer = new byte[sizeof(uint)];
                for (int i = 0; i < length; i++)
                {
                    rng.GetBytes(buffer);
                    uint num = BitConverter.ToUInt32(buffer, 0);
                    stringBuilder.Append(Chars[(int)(num % (uint)Chars.Length)]);
                }
            }
            return stringBuilder.ToString();
        }

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
                return new OkObjectResult(new
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


    }


}
