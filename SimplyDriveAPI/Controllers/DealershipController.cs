using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimplyDriveAPI.Models;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using SimplyDriveAPI.Services;
using SimplyDriveAPI.Dtos;
using Microsoft.AspNetCore.SignalR.Protocol;

namespace SimplyDriveAPI.Controllers
{
    //[Authorize] //TODO: ADD AUTHORIZATION BACK IN, BUT WE WANT TO ALLOW ADMIN ONLY ACCESS TO CERTAIN ENDPOINTS  
    [ApiController]
    [Route("Api/[controller]")]
    public class DealershipController : Controller
    {

        private readonly AppDbContext _context;
        private readonly DealerServices _dealerServices;
        private readonly BookingService _bookingServices;

        public DealershipController(DealerServices dealerServices, AppDbContext context, BookingService bookingService)
        {
            _dealerServices = dealerServices;
            _context = context;
            _bookingServices = bookingService;
        }



        [HttpGet("RetrieveAllDealerships")]
        public async Task<IActionResult> GetDealershipDetails()
        {


            var dealerships = await _context.DealershipData.ToListAsync();
            return Ok(dealerships);


        }

        [HttpGet("RetrieveDealershipData")]
        public async Task<IActionResult> GetDealerInfo(int dealerID)
        {
            var dealershipDataResult = await _context.Set<DealershipDataModel>().Where(d => d.dealerid == dealerID).ToListAsync();
            return Ok(dealershipDataResult);
        }

        [HttpPost("CreateDealer")]
        public async Task<IActionResult> CreateDealer(string dealerName, string addressLine1, string addressLine2, string postcode, double latitude, double longitude, string phoneNumber)
        {

            var dealerModel = new DealershipDataModel
            {
                dealername = dealerName,
                addressline1 = addressLine1,
                addressline2 = addressLine2,
                postcode = postcode,
                latitude = latitude,
                longitude = longitude,
                phonenumber = phoneNumber
            };

            _context.DealershipData.Add(dealerModel);

            await _context.SaveChangesAsync();


            int dealerID = dealerModel.dealerid;

            // call your service with the dealerID
            await _dealerServices.SetDefaultOpeningTimes(dealerID);

            await _context.SaveChangesAsync();

            return Ok();


        }

        [HttpDelete("RemoveDealer")]
        public async Task<IActionResult> RemoveVehicleFromUser(int dealerID)
        {
            // Find the record matching userID + vehicleID
            var dealerData = await _context.DealershipData
                .FirstOrDefaultAsync(d => d.dealerid == dealerID);

            if (dealerData == null)
            {
                return NotFound(new { message = "Dealership not found." });
            }

            // Remove it from the DbSet
            _context.DealershipData.Remove(dealerData);

            // Save changes
            await _context.SaveChangesAsync();

            return Ok(new { message = "Vehicle removed successfully." });

        }


        [HttpPost("AddTag")]
        public async Task<IActionResult> AddTag(int dealerID, DealerTagEnum tag)
        {
            var dealer = await _context.DealershipData.FindAsync(dealerID);
            if (dealer == null)
            {
                return NotFound(new { message = "Dealership not found." });
            }

            var tagModel = new DealerTagsModel
            {
                dealerid = dealerID,
                tagname = tag
            };

            try
            {
                _context.DealerTags.Add(tagModel);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Tag added successfully." });

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"An error occurred while adding the tag. {ex}" });
            }

        }

        [HttpDelete("RemoveTag")]
        public async Task<IActionResult> RemoveTag(int dealerID, DealerTagEnum tag)
        {
            var tagData = await _context.DealerTags
                .FirstOrDefaultAsync(t => t.dealerid == dealerID && t.tagname == tag);
            if (tagData == null)
            {
                return NotFound(new { message = "Tag not found for the specified dealership." });
            }
            _context.DealerTags.Remove(tagData);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Tag removed successfully." });
        }

        [HttpGet("RetrieveReviewStats")]
        public async Task<IActionResult> GetReviewStats(int dealerID)
        {
            var reviewStatsResult = await _context.Set<DealerReviewStatsModel>().Where(d => d.dealerid == dealerID).ToListAsync();
            return Ok(reviewStatsResult);
        }

        [HttpGet("AddBrandToDealer")]
        public async Task<IActionResult> AddBrandToDealer(int dealerID, BrandEnum dealerBrand)
        {
            var dealer = await _context.DealershipData.FindAsync(dealerID);
            if (dealer == null)
            {
                return NotFound(new { message = "Dealership not found." });
            }

            var brandsModel = new DealerBrandsModel
            {
                dealerid = dealerID,
                brand = dealerBrand
            };

            try
            {
                _context.DealerBrands.Add(brandsModel);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Brand added successfully." });

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"An error occurred while adding the Brand. {ex}" });
            }
        }

        [HttpDelete("RemoveBrand")]
        public async Task<IActionResult> RemoveBrandFromDealer(int dealerID, BrandEnum dealerBrand)
        {
            var brandData = await _context.DealerBrands
            .FirstOrDefaultAsync(d => d.dealerid == dealerID && d.brand == dealerBrand);

            if (brandData == null)
            {
                return NotFound(new { message = "Brand not found for the specified dealership." });
            }

            _context.DealerBrands.Remove(brandData);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Brand removed successfully." });
        }

        [HttpPost("AddTechnician")]
        public async Task<IActionResult> AddTechnicianToDealer(int dealerID, string firstName, string lastName, TechSkillEnum[] techSkill, bool isActive)
        {
            var dealer = await _context.DealershipData.FindAsync(dealerID);
            if (dealer == null)
            {
                return NotFound(new { message = "Dealership not found." });
            }

            var technicianModel = new TechnitianModel
            {
                dealerid = dealerID,
                firstname = firstName,
                lastname = lastName,
                skills = techSkill,
                isactive = true
            };

            try
            {
                _context.technicianModel.Add(technicianModel);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Technician added successfully." });

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"An error occurred while adding the technician. {ex}" });
            }
        }

        [HttpDelete("RemoveTechnician")]
        public async Task<IActionResult> RemoveTechnicianFromDealer(int dealerID, int technicianID)
        {
            var technicianModel = await _context.technicianModel
            .FirstOrDefaultAsync(d => d.dealerid == dealerID && d.technicianid == technicianID);

            if (technicianModel == null)
            {
                return NotFound(new { message = "Technician not found for the specified dealership." });
            }

            _context.technicianModel.Remove(technicianModel);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Technician removed successfully." });
        }

        [HttpGet("RetrieveTechnicians")]
        public async Task<IActionResult> GetTechnicians(int dealerID)
        {
            var technicianResult = await _context.Set<TechnitianModel>().Where(d => d.dealerid == dealerID).ToListAsync();
            return Ok(technicianResult);
        }

        [HttpPost("AddJobToDealer")]
        public async Task<IActionResult> AddJobToDealer(int dealerID, string name, string description, JobTypeEnum jobType, double labourTime, double partsCost, MakeEnum make, ModelEnum model, int yearStart, int yearEnd, int mileageInterval, string engine, fuelEnum fuel)
        {
            var dealer = await _context.DealershipData.FindAsync(dealerID);
            if (dealer == null)
            {
                return NotFound(new { message = "Dealership not found." });
            }
            var jobCodeModel = new JobCodeModel
            {
                dealerid = dealerID,
                name = name,
                description = description,
                type = jobType,
                labourtime = labourTime,
                partscost = partsCost,
                make = make,
                model = model,
                year_start = yearStart,
                year_end = yearEnd,
                mileage_interval = mileageInterval,
                engine = engine,
                fuel = fuel
            };
            try
            {
                _context.JobCodes.Add(jobCodeModel);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Job Code added successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"An error occurred while adding the Job Code. {ex}" });
            }

        }

        [HttpDelete("RemoveJobFromDealer")]
        public async Task<IActionResult> RemoveJobFromDealer(int dealerID, int jobID)
        {
            var jobCodeModel = await _context.JobCodes
            .FirstOrDefaultAsync(d => d.dealerid == dealerID && d.id == jobID);
            if (jobCodeModel == null)
            {
                return NotFound(new { message = "Job Code not found for the specified dealership." });
            }
            _context.JobCodes.Remove(jobCodeModel);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Job Code removed successfully." });
        }

        [HttpPost("AddBay")]
        public async Task<IActionResult> AddBayToDealer(string bayname, int dealerID)
        {
            if (string.IsNullOrWhiteSpace(bayname))
                return BadRequest(new { message = "Bay name cannot be empty." });

            var dealer = await _context.DealershipData.FindAsync(dealerID);
            if (dealer == null)
                return NotFound(new { message = "Dealership not found." });

            var baysDataModel = new BaysDataModel
            {
                bayname = bayname,
                dealerid = dealerID
            };

            try
            {
                _context.BaysDataModel.Add(baysDataModel);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Bay added successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"An error occurred while adding the bay. {ex.Message}" });
            }
        }

        [HttpDelete("RemoveBay")]
        public async Task<IActionResult> RemoveBayFromDealer(int dealerID, int bayID)
        {
            var baysDataModel = await _context.BaysDataModel
            .FirstOrDefaultAsync(d => d.dealerid == dealerID && d.bayid == bayID);

            if (baysDataModel == null)
            {
                return NotFound(new { message = "Bay not found for the specified dealership." });
            }

            _context.BaysDataModel.Remove(baysDataModel);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Bay removed successfully." });
        }

        [HttpGet("RetrieveBays")]
        public async Task<IActionResult> GetBays(int dealerID)
        {
            var bayDataResultNoAssignedJob = await _context.BaysDataModel
                .AsNoTracking()
                .Where(d => d.dealerid == dealerID && d.assignedjob == null)
                .ToListAsync();
                        
            
            var bayDataResultAssignedJob = await _context.BaysDataModel
                .AsNoTracking()
                .Where(d => d.dealerid == dealerID &&  d.assignedjob.HasValue)
                .ToListAsync();


            var assignedBookingData = new List<object>();
            var bayDataResultAssignedJobWithDetail = new List<object>();

            foreach (var bay in bayDataResultAssignedJob)
            {
                if(bay.assignedjob is not null) //If there is an assigned job load the extra data, if there isnt then delete it from the return
                {
                    var bookingData = await _bookingServices.GetDealershipBookingByID(bay.bayid);
                    assignedBookingData.Add(bookingData);

                    var bayResult = new
                    {
                        bay.bayid,
                        bay.bayname,
                        bay.assignedjob,
                        bookingData,
                        bay.assignedtechnician,
                    };

                    bayDataResultAssignedJobWithDetail.Add(bayResult);
                }

            }

            var result = new
            {
                BaysWithoutAssignedJobs = bayDataResultNoAssignedJob,
                BaysWithAssignedJobs = bayDataResultAssignedJobWithDetail
            };

            return Ok(result);

        }

        [HttpPut("AssignJobToBay")] //this is disgusting
        public async Task<IActionResult> assignJobToBay(int? newJobAssigned, int bayID)
        {

            var bay = await _context.BaysDataModel
                .FirstOrDefaultAsync(b => b.bayid == bayID);

            if (bay == null)
                return NotFound(new { message = "Bay not found." });

            try
            {

                var rowsAffected = await _context.BaysDataModel
                    .Where(b => b.bayid == bayID)
                    .ExecuteUpdateAsync(setters => setters.SetProperty(b => b.assignedjob, newJobAssigned));

                if (rowsAffected == 0)
                    return NotFound(new { message = "Bay not found." });

                // Then call UpdateStatus safely
                
                if (newJobAssigned.HasValue)
                {
                    await _bookingServices.UpdateStatus(newJobAssigned.Value, BookingStatusEnum.inworkshop);
                }
                   
                else 
                {
                    //Idk we want to change the enum of the now removed booking to onsite but idk how yet.
                    //await _bookingServices.UpdateStatus(newJobAssigned.Value,  BookingStatusEnum.onsite
                }

                    return Ok(new { message = "Assigned Job to bay successfully.", bayID, newJobAssigned });

            }
            catch (DbUpdateConcurrencyException ex)
            {
                return StatusCode(500, new { message = $"Concurrency error: {ex.Message}" });
            }
        }


    }
}
