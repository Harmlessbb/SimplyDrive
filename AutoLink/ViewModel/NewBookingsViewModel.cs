using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoLink.Service;
using AutoLink.Model;
using AutoLink.ViewModel;
using System.Runtime.InteropServices;
using CommunityToolkit.Mvvm.Input;
using System.Diagnostics;
using CommunityToolkit.Mvvm.ComponentModel;

namespace AutoLink.ViewModel
{
    public partial class NewBookingsViewModel
    {
        LogonViewModel logonViewModel;
        VehicleDetails? vehicleDetails;
        UserDetails? userDetails;
        VehicleService vehicleService;
        LoginService loginService;

        private bool motSelected = false;
        private bool serviceSelected = false;
        private bool diagSelected = false;



        public NewBookingsViewModel(LoginService loginService, VehicleService vehicleService)
        {
            this.vehicleService = vehicleService;
            this.loginService = loginService;
            this.logonViewModel = new LogonViewModel(loginService);
            _ = InitializeUserDetails();
        }

        private async Task InitializeUserDetails()
        {
            userDetails = await loginService.GetLoginInfo(logonViewModel);
            vehicleDetails = await vehicleService.GetVehicleInfo(null, this);
        }

        [RelayCommand]
        public Task toggleService() 
        {
            serviceSelected = !serviceSelected;
            Debug.WriteLine($"service is selected {serviceSelected}");
            return Task.CompletedTask;
        }
    }
}
