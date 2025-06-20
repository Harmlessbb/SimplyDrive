using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoLink.Model;
using System.Net.Http.Headers; 
using System.Text.Json;


namespace AutoLink.Service
{
    public class VehicleService
    {
        public string authCode { get; private set; } = string.Empty;

        public VehicleModel? VehicleInfo { get; set; }


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
    }
}
