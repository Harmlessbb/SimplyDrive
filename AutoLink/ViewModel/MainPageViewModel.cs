using AutoLink.Model;
using AutoLink.Service;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Diagnostics;
using System.Net.Security;
using System.Runtime.Serialization;
using System.Xml.Linq;


namespace AutoLink.ViewModel;



public partial class MainPageViewModel : ObservableObject
{

    [ObservableProperty]
    string userName = string.Empty;

    public ObservableCollection<ActiveBookings> ActiveBookings { get; } = new();

    public ObservableCollection<ActiveBookingMainPageDTO> ActiveBookingDTOs { get; } = new();

    public ObservableCollection<VehicleModel> VehicleModel { get; } = new();

    [ObservableProperty]
    public bool thereAreBookings = false;

    [ObservableProperty]
    public bool noBookings = true;

    [ObservableProperty]
    string registration = string.Empty;



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
            string _token = await SecureStorage.Default.GetAsync("accessToken");
            var bookings = await activeBookingService.GetActiveBookingsAsync();

            foreach (var booking in bookings)
            {
                var vehicleService = new VehicleService();
                await vehicleService.getVehicleInfo(_token, booking.vehicleId);

                var vehicle = vehicleService.VehicleInfo;


                if (vehicle != null)
                {
                    ActiveBookingDTOs.Add(new ActiveBookingMainPageDTO
                    {
                        BookingId = booking.bookingId,
                        VehicleId = vehicle.id,
                        VehicleRegistration = vehicle.registration,
                        BookingDate = DateOnly.FromDateTime(booking.bookingDate),
                        BookingTime = TimeOnly.Parse(booking.bookingTime),
                        IsService = booking.isService,
                        IsMot = booking.isMot,
                        IsDiagnostics = booking.isDiagnostics
                    });
                }

                await Shell.Current.DisplayAlert("Vehicle Info", $"Booking Time: {booking.bookingDate}, Time: {booking.bookingTime}", "OK");
            }

            ThereAreBookings = ActiveBookingDTOs.Any();
            NoBookings = !ThereAreBookings;

        }
        catch (Exception ex)
        {
            await Shell.Current.DisplayAlert("Error", $"Failed to retrieve active bookings: {ex.Message}", "OK");
        }

    }

    async Task IdToRegistraion(int vehicleId)
    {
        string? _token = await SecureStorage.Default.GetAsync("accessToken");


        if (string.IsNullOrEmpty(_token))
        {
            await Shell.Current.DisplayAlert("Error", "Access token is null or empty.", "OK");
            return;
        }

        try
        {
            var vehicleService = new VehicleService();

            await vehicleService.getVehicleInfo(_token, vehicleId);

            var vehicles = vehicleService.VehicleInfo;
            if (vehicles != null)
            {
                Registration = vehicles.registration;
                VehicleModel.Add(vehicles);

            }
            else
            {
                await Shell.Current.DisplayAlert("Error", "No vehicle information retrieved.", "OK");
            }
        }
        catch (Exception ex)
        {
            await Shell.Current.DisplayAlert("Error", $"Failed to retrieve vehicles: {ex.Message}", "OK");
        }

    }
}



