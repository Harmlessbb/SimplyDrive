using SimplyDrive.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace SimplyDrive.Service
{
    class DealershipService
    {

        public string authCode { get; private set; } = string.Empty;

        public DealershipModel? DealershipInfo { get; set; }


        public async Task getDealershipInfo(string accessToken, int dealerID)
        {
            if (string.IsNullOrEmpty(accessToken))
            {
                throw new ArgumentException("Access token cannot be null or empty.", nameof(accessToken));
            }


            string dealerInfoUrl = "https://api.simplydrive.app/Api/Dealership/DealershipData" + $"?dealerID={dealerID}";
            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                HttpResponseMessage response = await client.GetAsync(dealerInfoUrl);
                if (response.IsSuccessStatusCode)
                {
                    string jsonResponse = await response.Content.ReadAsStringAsync();
                    DealershipInfo = JsonSerializer.Deserialize<DealershipModel>(jsonResponse);

                }
                else
                {
                    throw new Exception($"Failed to retrieve Dealership info: {response.ReasonPhrase}");
                }
            }
        }
    }

}
