using CommunityToolkit.Mvvm.ComponentModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using SimplyDrive.Service;
using CommunityToolkit.Mvvm.Input;
using System.Diagnostics;

namespace SimplyDrive.ViewModel
{
    public partial class DevPage1ViewModel : ObservableObject
    {
        [ObservableProperty]
        private string userInfo = "No User Info";

        [ObservableProperty]
        private string vehicleInfo = "No Vehicle Info"; 

        private LoginService _loginService;
        private VehicleService _vehicleService;

        public DevPage1ViewModel(LoginService loginService, VehicleService vehicleService)
        {
            _loginService = loginService;
            _vehicleService = vehicleService;
            if (_loginService.UserInfo is not null)
            {
                userInfo = $"User First Name: {_loginService.UserInfo}";
            }
        }

        [RelayCommand]
        public async Task LoadUserInfo()
        {
            string _token = await SecureStorage.Default.GetAsync("accessToken");

            await _loginService.getUserInfo(_token);

            if (_loginService.UserInfo is not null)
            {

                UserInfo = $"UserID: {_loginService.UserInfo.userID}\n" +
                           $"First Name: {_loginService.UserInfo.firstName}\n" +
                           $"Last Name: {_loginService.UserInfo.lastName}\n" +
                           $"Email: {_loginService.UserInfo.email}";
                await Shell.Current.DisplayAlert("User Info", UserInfo, "OK");
            }
            else
            {
                UserInfo = "No User Info Loaded";
                await Shell.Current.DisplayAlert("No User Info", "", "OK");
            }
        }

        [RelayCommand]
        public async Task RetrieveOwnedVehicles()
        {
            try
            {
                string _token = await SecureStorage.Default.GetAsync("accessToken");

                var vehicles = await _vehicleService.getOwnedVehicles(_token, "973d1600-5f87-43ac-9b7d-608b992fa942");

                //if (vehicles.Count != 0)
                //{
                    //vehicles.Clear();
                //}
                foreach (var vehicle in vehicles)
                {
                    vehicles.Add(vehicle);
                    string vehiclestring = $"Vehicle Reg: {vehicle.registration}, Make: {vehicle.make}, Model: {vehicle.model}, Fuel {vehicle.fuel_type}";
                    await Shell.Current.DisplayAlert("Vehicle Info", vehiclestring, "OK");
                }

            }
            catch (Exception ex)
            {
                await Shell.Current.DisplayAlert("Error", ex.Message, "OK");
                Debug.WriteLine($"ERROR!: {ex}");
            }

        }

        [RelayCommand]
        public async Task RemoveVehicle()
        {

            string _token = await SecureStorage.Default.GetAsync("accessToken");

            await _vehicleService.removeVehicle(_token, "973d1600-5f87-43ac-9b7d-608b992fa942", "1");

        }

        [RelayCommand]
        public async Task AddVehicle()
        {

            string _token = await SecureStorage.Default.GetAsync("accessToken");

            await _vehicleService.addVehicle(_token, "973d1600-5f87-43ac-9b7d-608b992fa942", "ABC123");

        }

    }
}
