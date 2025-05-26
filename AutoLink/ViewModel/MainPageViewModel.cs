using CommunityToolkit.Mvvm.ComponentModel;
using AutoLink.Service;
using CommunityToolkit.Mvvm.Input;
using System.Diagnostics;
using AutoLink.Model;
using System.Net.Security;
using System.ComponentModel;
using System.Collections.ObjectModel;


namespace AutoLink.ViewModel;



public partial class MainPageViewModel : ObservableObject
{

    LogonViewModel logonViewModel;
    VehicleDetails? vehicleDetails;
    UserDetails? userDetails;
    VehicleService vehicleService;
    LoginService loginService;

    [ObservableProperty]
    private string displayRegistration = "";

    [ObservableProperty]
    private string displayName = "";


    public MainPageViewModel(LoginService loginService, VehicleService vehicleService)
    {
        this.vehicleService = vehicleService;
        this.loginService = loginService;
        this.logonViewModel = new LogonViewModel(loginService);
        InitializeUserDetails();

    }

    private bool isBookedIn;


    private async Task InitializeUserDetails()
    {
        userDetails = await loginService.GetLoginInfo(logonViewModel);
        vehicleDetails = await vehicleService.GetVehicleInfo(this, null);
    }


    [RelayCommand]
    public async Task DisplayAllUserInfo()
    {
        if (vehicleDetails != null)
        {

            await Shell.Current.DisplayAlert("User Details Retrieved! ", $"{userDetails.UserFirstName}", "Yay!");
        }

        await Task.CompletedTask;
    }

    [RelayCommand]
    public async Task Load()
    {
        await InitializeUserDetails();

        if (vehicleDetails != null)
        {
            Debug.WriteLine($"Setting the Display Registration to Database Registration which is {vehicleDetails.vehicleRegistration}");
            DisplayName = userDetails.UserFirstName;
            DisplayRegistration = vehicleDetails.vehicleRegistration;
            isBookedIn = vehicleDetails.isBookedIn;
        }
        else
        {
            Debug.WriteLine("VehicleDetails is null");
        }

        if(isBookedIn is true)
        {

        }
        else
        {

        }

    }
}
