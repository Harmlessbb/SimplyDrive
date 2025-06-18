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

    [ObservableProperty]
    string userName = string.Empty;

    public ObservableCollection<ActiveBookings> ActiveBookings { get; } = new();

    [ObservableProperty]
    public bool thereAreBookings = false;

    [ObservableProperty]
    public bool noBookings = true;

    LoginService loginService;
    ActiveBookingService activeBookingService;

    public MainPageViewModel(LoginService loginService, ActiveBookingService activeBookingService)
    {

        this.loginService = loginService;
        this.activeBookingService = activeBookingService;

        _ = Initialize();

  
    }



    private async Task Initialize()
    {


        string _token = await SecureStorage.Default.GetAsync("accessToken");

        await loginService.getUserInfo(_token);
        await RetrieveActiveBookings();

        if (loginService.UserInfo != null)
        {
            UserName = loginService.UserInfo.firstName;
        }
        else
        {
            await Shell.Current.DisplayAlert("Error", "User info not loaded.", "OK");
        }

        if (ActiveBookings.Count == 0)
        {
            ThereAreBookings = false;
            NoBookings = true;
        }
        else
        {
            ThereAreBookings = true;
            NoBookings = false;
        }
    }

    [RelayCommand]
    async Task RetrieveActiveBookings()
    {
        try
        {
            var bookings = await activeBookingService.GetActiveBookingsAsync();

            foreach (var booking in bookings)
            {
                ActiveBookings.Add(booking);
            }

        }
        catch (Exception ex)
        {
            await Shell.Current.DisplayAlert("Error", $"Failed to retrieve active bookings: {ex.Message}", "OK");
        }

    }

}



