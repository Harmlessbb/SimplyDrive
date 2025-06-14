using System;
using System.Collections.Generic;
using System.Diagnostics;
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
        public async Task attemptLogin()
        {



#pragma warning disable CA1416
            if (DeviceInfo.Platform != DevicePlatform.WinUI)
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
                    

                    if(authResult is null)
                    {
                        
                        throw new InvalidOperationException("Authentication result is null.");

                    }

                   
                    authCode = authResult.Properties["code"];
                    TokenModel.accessToken = authCode;

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

                    TokenModel.accessToken = accessToken;

                }
                catch (Exception ex)
                {
                    authCode = $" EXCEPTION: {ex}";
                    TokenModel.accessToken = authCode;
                }


            }

            else
            {
                Debug.WriteLine("Cannot Logon On Windows! ");
            }
        }

    }
}
