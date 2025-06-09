using System;
using System.Collections.Generic;
using System.Diagnostics;
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
                string authUrl = "http://10.0.2.2:8080/realms/SimplyDriveDev/protocol/openid-connect/auth" +
                "?client_id=SimplyDriveCustomerApp" +
                "&response_type=code" +
                "&scope=openid%20profile%20email" +
                "&redirect_uri=maui://callback";

                string redirectUri = "maui://callback";



                try
                {
                    Debug.WriteLine("Attempting to authenticate...");

                    WebAuthenticatorResult authResult = await WebAuthenticator.Default.AuthenticateAsync(
                        
                        new Uri(authUrl), 
                        new Uri(redirectUri));
                    
                    Debug.WriteLine("Authentication Done");

                    if(authResult is not null)
                    {
                        authCode = authResult.Properties["code"];

                    }
                    else
                    {
                        authCode = "Authentication Failed: Result is null";
                    }


                }
                catch (Exception ex)
                {
                    authCode = $" EXCEPTION: {ex}";
                }


            }
            else
            {
                Debug.WriteLine("Cannot Logon On Windows! ");
            }
        }

    }
}
