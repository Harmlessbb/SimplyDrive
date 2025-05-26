using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoLink.Model;
using AutoLink.ViewModel;
using CommunityToolkit.Mvvm.ComponentModel;
using Npgsql;

namespace AutoLink.Service
{



    public class LoginService
    {
        //This string cannot be leaked at all costs! Must be encrypted ! 
        private string connectionString = "Host=192.168.1.213;Port=5432;Username=postgres;Password=Liverpool22!;Timeout=10;SslMode=Prefer";

        private UserDetails? userDetails;


        public async Task <UserDetails> GetLoginInfo(LogonViewModel logonViewModel)
        {   
            
            if(userDetails != null)
            {
                return userDetails;
            }


            Debug.Write("GettingLogonInfo...");
            userDetails = new UserDetails();
            try
            {
                using (var connect = new NpgsqlConnection(connectionString))
                {
                    await connect.OpenAsync();
                    Debug.WriteLine("Connection Established!");

                    //Find an account in the Database using the username provided by the user in the logonViewModel.
                    var cmd = new NpgsqlCommand($"SELECT * FROM userDetails WHERE useremail = @username", connect);
                    cmd.Parameters.AddWithValue("@username", logonViewModel.userInputUsername);


                    Debug.WriteLine("Login Service Has Found Account in Database");
                    var reader = await cmd.ExecuteReaderAsync();
                    Debug.WriteLine("Query Executed");

                    if (await reader.ReadAsync()) // If we find one, set local variables to the values in the database.
                    {
                        userDetails.UserId = (int)reader.GetInt64(0);
                        Debug.WriteLine($"USER ID IS: {userDetails.UserId}" );
                        userDetails.Username = reader.GetString(1);
                        Debug.WriteLine("USERNAMEOK!");
                        userDetails.Password = reader.GetString(2);
                        Debug.WriteLine("PasswordOK!");
                        userDetails.UserFirstName = reader.GetString(3);
                        Debug.WriteLine("firstNameOK!");
                        userDetails.UserLastName = reader.GetString(4);
                        //Debug.WriteLine("lastNameOK!");
                        userDetails.UserStreetName = reader.GetString(5);
                        //Debug.WriteLine("StreetNameOK!");
                        userDetails.UserHouseNumber = (int)reader.GetInt64(6);
                        //Debug.WriteLine("HouseNumberOK!");
                        userDetails.UserPostCode = reader.GetString(7);
                        //Debug.WriteLine("PostCodeOK!");
                        userDetails.UserPhoneNumber = reader.GetString(8);
                        //Debug.WriteLine($"PhoneNumber is {userDetails.UserPhoneNumber}");
                        userDetails.UserVehicleTableID = (int)reader.GetInt64(9);
                        userDetails.LastUsedDealer = (int)reader.GetInt64(10);
                    }
                    else
                    {
                        // If we don't find an account with existing email, do nothing. 
                        Debug.WriteLine("No User Found!");
                    }

                        
                    reader.Close();
                    connect.Close();
                }

            }
            catch(Exception ex)
            {
                await Shell.Current.DisplayAlert("Error! ", $"{ex.Message}", "Ok");
            }
            return userDetails;
        }




    }
}
