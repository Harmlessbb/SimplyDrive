using Microsoft.EntityFrameworkCore.Query.Internal;
using System.Security.Cryptography;
using System.Text;

namespace SimplyDriveAPI.Services
{
    public class QRServices
    {
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
    

    }
}
