using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http.Headers;
using System.Text.Json;
using SimplyDrive.ViewModel;
using CommunityToolkit.Mvvm.ComponentModel;
using Microsoft.Maui.Authentication;
using SimplyDrive.Model;


namespace SimplyDrive.Service
{

    public class LoginService
    {
        public string authCode { get; private set; } = string.Empty;
        public UserModel? UserInfo { get; set; }


        public async Task getUserInfo(string accessToken)
        {


            try
            {


                // Ensure you have the access token from Keycloak
                if (string.IsNullOrEmpty(accessToken))
                {
                    throw new ArgumentException("Access token cannot be null or empty.", nameof(accessToken));
                }

                var client = new HttpClient();
                client.BaseAddress = new Uri("https://api.simplydrive.app/");
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);


                var response = await client.GetAsync("Api/User/Whoami");
                string apiResponse = await response.Content.ReadAsStringAsync();

                Debug.WriteLine($"API RESPONSE: {apiResponse}");


                UserInfo = JsonSerializer.Deserialize<UserModel>(apiResponse, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                Debug.WriteLine($"User First Name: {UserInfo.firstName}");

            }

            catch (Exception ex)
            {
                Debug.WriteLine("Error", $"{ex}", "ok");
            }
        }


    }



}
