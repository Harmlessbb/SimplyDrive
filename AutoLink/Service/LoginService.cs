using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoLink.Model;
using AutoLink.ViewModel;
using CommunityToolkit.Mvvm.ComponentModel;
using System.Net.Http.Json;

namespace AutoLink.Service
{



    public class LoginService
    {


        public async Task RetrieveDBInfo()
        {
            using var httpClient = new HttpClient();

            try
            {
                if (DeviceInfo.Platform == DevicePlatform.Android)
                {
                    var response = await httpClient.GetAsync("http://109.159.126.31:7270/api/UserDetails/Get%20userdetails");
                    Debug.WriteLine($"Response: {response.StatusCode}");
                    Debug.WriteLine("Running on Android");
                }
                else
                {
                    var response = await httpClient.GetAsync("http://109.159.126.31:7270/api/UserDetails/Get%20userdetails");
                    Debug.WriteLine($"Response: {response.StatusCode}");
                }

            }

            catch (Exception ex)
            {
                Debug.WriteLine($"Error: {ex.Message}");
            }
        }

    }
}
