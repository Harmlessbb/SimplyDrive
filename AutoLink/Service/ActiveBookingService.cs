using Microsoft.Win32.SafeHandles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using SimplyDrive.Model;
using System.Net.Http.Json;


namespace SimplyDrive.Service
{
    public class ActiveBookingService
    {
        List<ActiveBookings> ActiveBookings { get; set; } = new ();

        public async Task <List<ActiveBookings>> GetActiveBookingsAsync()
        {

            try
            {
                string? accessToken = await SecureStorage.Default.GetAsync("accessToken");

                // Ensure you have the access token from Keycloak
                if (string.IsNullOrEmpty(accessToken))
                {
                    throw new ArgumentException("Access token cannot be null or empty.", nameof(accessToken));
                }

                var client = new HttpClient();
                client.BaseAddress = new Uri("https://api.simplydrive.app/");
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);



                var response = await client.GetAsync("Api/User/ActiveBookings");

                if (response.IsSuccessStatusCode)
                {
                    ActiveBookings = await response.Content.ReadFromJsonAsync<List<ActiveBookings>>();
                }


                return ActiveBookings;

            }
            catch (Exception ex)
            {
                await Shell.Current.DisplayAlert("Error", $"{ex}", "ok");
                return new List<ActiveBookings>();
            }
        }
    }
}

