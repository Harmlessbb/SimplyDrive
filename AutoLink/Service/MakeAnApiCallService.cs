using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http.Headers;
using System.Diagnostics;


namespace AutoLink.Service
{
    public class MakeAnApiCallService
    {
        public string apiResponse = "Unchanged";

        public async Task MakeApiCallAsync(string accessToken)
        {
            // Ensure you have the access token from Keycloak
            if (string.IsNullOrEmpty(accessToken))
            {
                throw new ArgumentException("Access token cannot be null or empty.", nameof(accessToken));
            }

            var client = new HttpClient();
            client.BaseAddress = new Uri("http://10.0.2.2:5298/");
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);


            var response = await client.GetAsync("api/endpoint");
            apiResponse = await response.Content.ReadAsStringAsync();
        } }
}
