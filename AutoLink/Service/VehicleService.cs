using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http.Headers;
using System.Text.Json;
using SimplyDrive.Model;
using System.Net.Http.Json;



namespace SimplyDrive.Service
{
    public class VehicleService
    {
        public string authCode { get; private set; } = string.Empty;

        public VehicleModel? VehicleInfo { get; set; }

        List<VehicleModel> Vehicles = new();
        public async Task getVehicleInfo(string accessToken, int vehID)
        {
            if (string.IsNullOrEmpty(accessToken))
            {
                throw new ArgumentException("Access token cannot be null or empty.", nameof(accessToken));
            }

            string vehicleInfoUrl = "https://api.simplydrive.app/Api/Vehicle/VehicleDetails" + $"?VehicleID={vehID}";
            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                HttpResponseMessage response = await client.GetAsync(vehicleInfoUrl);
                if (response.IsSuccessStatusCode)
                {
                    string jsonResponse = await response.Content.ReadAsStringAsync();
                    VehicleInfo = JsonSerializer.Deserialize<VehicleModel>(jsonResponse);
                    
                }
                else
                {
                    throw new Exception($"Failed to retrieve vehicle info: {response.ReasonPhrase}");
                }
            }
        }

        public async Task<List<VehicleModel>> getOwnedVehicles(string accessToken, string userID)
        {
            if (string.IsNullOrEmpty(accessToken))
            {
                throw new ArgumentException("Access token cannot be null or empty.", nameof(accessToken));
            }

            string ownedVehicleURL = "https://api.simplydrive.app/Api/Vehicle/OwnedVehciles" + $"?UserID={userID}";

            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                HttpResponseMessage response = await client.GetAsync(ownedVehicleURL);

                if (response.IsSuccessStatusCode)
                {
                    Vehicles = await response.Content.ReadFromJsonAsync<List<VehicleModel>>();
                    return Vehicles;
                }
                else
                {
                    throw new Exception($"Failed to retrieve vehicle info: {response.ReasonPhrase}");

                }
            }
        }

        public async Task removeVehicle(string accessToken, string userID, string vehicleID)
        {
            if (string.IsNullOrEmpty(accessToken))
            {
                throw new ArgumentException("Access token cannot be null or empty.", nameof(accessToken));
            }

            string removeVehicleURL = "https://api.simplydrive.app/Api/Vehicle/RemoveVehicle" + $"?UserID={userID}&vehicleID={vehicleID}";

            using (HttpClient client = new HttpClient())
            {

                try
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                    HttpResponseMessage response = await client.DeleteAsync(removeVehicleURL);

                    if (response.IsSuccessStatusCode)
                    {
                        await Shell.Current.DisplayAlert("200", $"Successfully removed vehicle", "ok");
                    }
                    else
                    {
                        await Shell.Current.DisplayAlert("Error", $"Failed to remove vehicle {response}", "ok");
                    }

                }
                catch(Exception ex)
                {
                    await Shell.Current.DisplayAlert("error", $"Failed to delete vehicle: {ex} ", "ok");
                }
            }


        }

        public async Task addVehicle(string accessToken, string userID, string vehicleRegistration)
        {
            if (string.IsNullOrEmpty(accessToken))
            {
                throw new ArgumentException("Access token cannot be null or empty.", nameof(accessToken));
            }

            string addVehicleURL = "https://api.simplydrive.app/Api/Vehicle/AddVehicle" + $"?UserID={userID}&vehicleRegistration={vehicleRegistration}";

            using (HttpClient client = new HttpClient())
            {

                try
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                    HttpResponseMessage response = await client.PostAsync(addVehicleURL, null);

                    if (response.IsSuccessStatusCode)
                    {
                        await Shell.Current.DisplayAlert("200", $"Successfully added vehicle", "ok");
                    }
                    else
                    {
                        await Shell.Current.DisplayAlert("Error", $"Failed to add vehicle {response}", "ok");
                    }

                }
                catch (Exception ex)
                {
                    await Shell.Current.DisplayAlert("error", $"Failed to add vehicle: {ex} ", "ok");
                }
            }

        }

    }
}
