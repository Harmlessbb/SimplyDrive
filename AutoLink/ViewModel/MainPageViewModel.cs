using SimplyDrive.Service;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using SimplyDrive.Model;
using System.Collections.ObjectModel;


namespace SimplyDrive.ViewModel;



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


    [ObservableProperty]
    public bool isLoaded = false;

    LoginService loginService;
    ActiveBookingService activeBookingService;

    public MainPageViewModel(LoginService loginService, ActiveBookingService activeBookingService)
    {

        this.loginService = loginService;
        this.activeBookingService = activeBookingService;

    }



    public async Task Initialize()
    {
        IsLoaded = false;

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

        if (ActiveBookingDTOs.Count == 0)
        {
            ThereAreBookings = false;
            NoBookings = true;
        }
        else
        {
            ThereAreBookings = true;
            NoBookings = false;
        }

        IsLoaded = true;
    }

    [RelayCommand]
    async Task RetrieveActiveBookings()
    {

        ActiveBookingDTOs.Clear();

        try
        {

            string _token = await SecureStorage.Default.GetAsync("accessToken");
            var bookings = await activeBookingService.GetActiveBookingsAsync();


            foreach (var booking in bookings)
            {

                var vehicleService = new VehicleService();
                var dealershipService = new DealershipService();

                var vehicleTask = vehicleService.getVehicleInfo(_token, booking.vehicleId);
                var dealerTask = dealershipService.getDealershipInfo(_token, booking.dealerId);

                await Task.WhenAll(vehicleTask, dealerTask);

                var vehicle = vehicleService.VehicleInfo;
                var dealership = dealershipService.DealershipInfo;



                if (vehicle != null)
                {
                    ActiveBookingDTOs.Add(new ActiveBookingMainPageDTO
                    {
                        BookingId = booking.bookingId,
                        VehicleId = vehicle.id,
                        VehicleRegistration = vehicle.registration,
                        //DealerId = dealership.id, // Accessing the first dealership's id
                        DealerName = dealership.dealername,
                        BookingDate = DateOnly.FromDateTime(booking.bookingDate),
                        BookingTime = TimeOnly.Parse(booking.bookingTime), 
                        IsService = booking.isService,
                        IsMot = booking.isMot,
                        IsDiagnostics = booking.isDiagnostics,
                        BookingTypeString = $"{(booking.bookingDate):yyyy-MM-dd} - " +
                        (booking.isService ? "Service" :
                         booking.isMot ? "MOT" :
                         booking.isDiagnostics ? "Diagnostics" : "Unknown")
                    });
                }

            }

            ThereAreBookings = ActiveBookingDTOs.Any();
            NoBookings = !ThereAreBookings;

        }
        catch (Exception ex)
        {
            await Shell.Current.DisplayAlert("Error", $"Failed to retrieve active bookings", "OK");
        }

    }

}