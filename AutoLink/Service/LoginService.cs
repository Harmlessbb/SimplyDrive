using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http.Headers;
using System.Text.Json;
using AutoLink.Model;
using AutoLink.ViewModel;
using CommunityToolkit.Mvvm.ComponentModel;
using Microsoft.Maui.Authentication;


namespace AutoLink.Service
{

    public class LoginService
    {
        public string authCode { get; private set; } = string.Empty;
        public UserModel? UserInfo { get; set; }

        public async Task attemptLogin()
        {

            if (DeviceInfo.Platform != DevicePlatform.WinUI) 
            {
                await getAccessToken();
                string ?accessToken = await SecureStorage.Default.GetAsync("accessToken");
                await getUserInfo(accessToken);
            }
            else
            {
                Debug.WriteLine("Cannot Logon On Windows! ");
            }
        }

        private async Task getAccessToken()
        {
            string authUrl = "https://auth.simplydrive.app/realms/SimplyDriveCustomers/protocol/openid-connect/auth" +
            "?client_id=SimplyDriveAppClient" +
            "&response_type=code" +
            "&scope=openid%20profile%20email" +
            "&redirect_uri=maui://callback";

            string redirectUri = "maui://callback";



            try
            {
                //Step 1: Get authCode

                WebAuthenticatorResult authResult = await WebAuthenticator.Default.AuthenticateAsync(

                    new Uri(authUrl),
                    new Uri(redirectUri));


                if (authResult is null)
                {

                    throw new InvalidOperationException("Authentication result is null.");

                }


                authCode = authResult.Properties["code"];


                //Step 2: Exchange authCode for an Access Token - I think this will break when I run keycloak in prod mode lol

                var tokenClient = new HttpClient();
                var tokenRequest = new HttpRequestMessage(HttpMethod.Post,
                    "https://auth.simplydrive.app/realms/SimplyDriveCustomers/protocol/openid-connect/token")
                {
                    Content = new FormUrlEncodedContent(new Dictionary<string, string>
                        {
                            { "grant_type", "authorization_code" },
                            { "code", authCode },
                            { "redirect_uri", redirectUri },
                            { "client_id", "SimplyDriveAppClient" }

                        })
                };

                var tokenResponse = await tokenClient.SendAsync(tokenRequest);
                var tokenJson = await tokenResponse.Content.ReadAsStringAsync();

                Debug.WriteLine($"Token Response: {tokenJson}");

                var jsonDoc = JsonDocument.Parse(tokenJson);
                string accessToken = jsonDoc.RootElement.GetProperty("access_token").GetString();

                await SecureStorage.Default.SetAsync("accessToken", $"{accessToken}");


            }
            catch (Exception ex)
            {
                authCode = $" EXCEPTION: {ex}";
            }
        }

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
                await Shell.Current.DisplayAlert("Error", $"{ex}", "ok");
            }
        }


    }



}
