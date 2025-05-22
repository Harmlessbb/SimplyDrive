using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoLink.Model;
using AutoLink.ViewModel;
using Microsoft.Maui.ApplicationModel.Communication;
using Npgsql;

namespace AutoLink.Service
{
    public class VehicleService
    {

        public int vehicleID;



        LogonViewModel logonViewModel;
        NewBookingsViewModel newBookingsViewModel;

        VehicleDetails vehicleDetails = new VehicleDetails();
        UserDetails? userDetails;
        LoginService loginService;

        public VehicleService(LoginService loginService)
        {
            this.loginService = loginService;
            this.logonViewModel = new LogonViewModel(loginService);
            InitializeUserDetails();
        }
        private async void InitializeUserDetails()
        {
            userDetails = await loginService.GetLoginInfo(logonViewModel);

        }

        private string connectionString = "Host=192.168.1.254;Port=5432;Username=postgres;Password=Liverpool22!;Timeout=10;SslMode=Prefer";


        public async Task<VehicleDetails> GetVehicleInfo(MainPageViewModel mainPageViewModel, NewBookingsViewModel newBookingsViewModel) //get the login info from the database and set all local variables to the values in the database. 
        {
            try
            {
                using (var connect = new NpgsqlConnection(connectionString))
                {
                    await connect.OpenAsync();
                    Debug.WriteLine("Connection Established!");



                    var cmd = new NpgsqlCommand($"SELECT * FROM VehownershipTable WHERE UserID = @userID", connect);
                    var reader = await cmd.ExecuteReaderAsync();

                    if (userDetails != null)
                    {
                        cmd.Parameters.AddWithValue("@userID", userDetails.UserId);

                    }
                    else
                    {
                        Debug.WriteLine("UserDetails is null");
                    }
                    if (await reader.ReadAsync())
                    {
                        vehicleID = (int)reader.GetInt64(1);
                        await reader.CloseAsync();
                        Debug.WriteLine($"Vehicle ID IS: {vehicleID}");



                        var vehcmd = new NpgsqlCommand("SELECT * FROM VehicleDB WHERE id = @vehicleID", connect);
                        vehcmd.Parameters.AddWithValue("@vehicleID", vehicleID );
                        var vehreader = await vehcmd.ExecuteReaderAsync();
                        if (await vehreader.ReadAsync())
                        {
                            vehicleDetails.vehicleID = (int)vehreader.GetInt32(0);
                            vehicleDetails.vehicleRegistration = vehreader.GetString(1);
                            
                            vehicleDetails.vehicleModel = vehreader.GetString(2);
                            vehicleDetails.vehicleBrand = vehreader.GetString(3);
                            vehicleDetails.lastService = vehreader.GetDateTime(4);
                            vehicleDetails.nextService = vehreader.GetDateTime(5);
                            vehicleDetails.motDue = vehreader.GetDateTime(6);
                            vehicleDetails.isBookedIn = vehreader.GetBoolean(7);
                            Debug.WriteLine($"VS: VEHICLE DETAILS RETRIEVED  vehreg is:{vehicleDetails.vehicleRegistration}");
                        }
                        else
                        {
                            Debug.WriteLine("No vehicle found");


                        }

                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return vehicleDetails;
        }
        
    }
}
