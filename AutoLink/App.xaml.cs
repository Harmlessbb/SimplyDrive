using SimplyDrive.Model;
using SimplyDrive.Service;
using SimplyDrive.ViewModel;
using System.Diagnostics;

namespace SimplyDrive
{
    public partial class App : Application
    {
        public App()
        {

            InitializeComponent();
            Connectivity.Current.ConnectivityChanged += OnConnectivityChanged;

        }

        protected override Window CreateWindow(IActivationState? activationState)
        {
            return new Window(new AppShell());
        }


        //Internet Check
        private void OnConnectivityChanged(object? sender, ConnectivityChangedEventArgs e)
        {
            var access = e.NetworkAccess; 
            var profiles = e.ConnectionProfiles;

            MainThread.BeginInvokeOnMainThread(() =>
            {
                if (access == NetworkAccess.Internet)
                {
                    // Wifi Connected

                    Debug.WriteLine("Internet is available");
                }
                else
                {
                    // Wifi Disconnected

                    Debug.WriteLine("Internet is not available");

                    Shell.Current.DisplayAlert("No Internet", "Please check your internet connection.", "OK");
                }
            });
        }

    }
}