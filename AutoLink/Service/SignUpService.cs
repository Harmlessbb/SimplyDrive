using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoLink.Model;
using AutoLink.ViewModel;
using Npgsql;

namespace AutoLink.Service
{
    public class SignUpService
    {
        //This string cannot be leaked at all costs! Must be encrypted ! 
        private string connectionString;
        private UserDetails? userDetails;

        public SignUpService()
        {
            connectionString = "Host=192.168.1.213;Port=5432;Username=postgres;Password=Liverpool22!;Timeout=10;SslMode=Prefer";
        }


        public async Task<UserDetails> CreateNewUser(SignUpViewModel signUpViewModel)
        {

            if (userDetails != null)
            {
                return userDetails;
            }
            try
            {
                Debug.WriteLine("Creating New User...");
                using (var connect = new NpgsqlConnection(connectionString))
                {
                    await connect.OpenAsync();
                    Debug.WriteLine("Connection Established!");

                    var cmd = new NpgsqlCommand("INSERT INTO userDetails (userEmail, userPassword, userFirstName, userLastName, userstreetname, userhousenumber, userpostcode, datecreated, isVerified) VALUES (@username, @password, @firstname, @lastname, 'N/A', 9999, 'NA', @datecreated, false)", connect);
                    cmd.Parameters.AddWithValue("@username", signUpViewModel.userInputUsername);
                    cmd.Parameters.AddWithValue("@password", signUpViewModel.userInputPassword);
                    cmd.Parameters.AddWithValue("@firstname", signUpViewModel.userInputFirstName);
                    cmd.Parameters.AddWithValue("@lastname", signUpViewModel.userInputLastName);
                    cmd.Parameters.AddWithValue("@datecreated", DateTime.Now);
                    Debug.WriteLine($"Attempting to add Values: User: {signUpViewModel.userInputUsername} Pass: {signUpViewModel.userInputPassword} FirstName: {signUpViewModel.userInputFirstName} Date {DateTime.Now}");

                    await cmd.ExecuteNonQueryAsync();
                    Debug.WriteLine("Executed Query!");
                }

                userDetails = new UserDetails
                {
                    Username = signUpViewModel.userInputUsername,
                    Password = signUpViewModel.userInputPassword,
                    UserFirstName = signUpViewModel.userInputFirstName,
                    UserLastName = signUpViewModel.userInputLastName
                };

                return userDetails;

            }
            catch (Exception ex) //This Shouldn't happen! 
            {
                await Shell.Current.DisplayAlert("Error! ", $"{ex.Message}", "Ok");
                throw;
            }
        }

    }
}
