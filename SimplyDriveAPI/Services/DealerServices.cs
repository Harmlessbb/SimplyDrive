using Microsoft.AspNetCore.Mvc;
using SimplyDriveAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Diagnostics;

namespace SimplyDriveAPI.Services
{
    public class DealerServices
    {

        private readonly AppDbContext _context;
        public DealerServices(AppDbContext context)
        {
            _context = context;
        }
        public async Task SetDefaultOpeningTimes(int dealerID) 
        {
            Debug.WriteLine("Function Called");
            var currentSetHours = await _context.Set<DealerOpeningTimesModel>().Where(v => v.dealerid == dealerID).ToListAsync();
            if(currentSetHours.Any())
            {
                return;
            }
            else
            {
                for (int dayCounter = 1; dayCounter < 8; dayCounter++)
                {
                    var defaultHours = new DealerOpeningTimesModel
                    {
                        dealerid = dealerID,
                        dayofweek = dayCounter,
                        openingtime = TimeOnly.Parse("00:00"),
                        closingtime = TimeOnly.Parse("00:00"),
                    };
                    Debug.WriteLine($"Adding {dayCounter} Day To Opening Times");
                    _context.openinghours.Add(defaultHours);

                }

                return;
            }
        }



    }

}
