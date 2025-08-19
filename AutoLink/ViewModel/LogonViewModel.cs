namespace SimplyDrive.ViewModel;
using SimplyDrive.Model;
using SimplyDrive.ViewModel;
using CommunityToolkit.Mvvm.Input;
using Microsoft.Maui.Networking;
using System.Diagnostics;

using SimplyDrive.View;
using CommunityToolkit.Mvvm.ComponentModel;

using System.Threading.Tasks;
using SimplyDrive.Service;

public partial class LogonViewModel : ObservableObject
{

    [ObservableProperty]
    private bool isBusy = false;

    [ObservableProperty]
    private bool isConnected; 

    private string Code;


	public LogonViewModel()
	{

	}


	[RelayCommand]
	public async Task ValidateLogin() //Handles page Navigation after login
    {


        Code = await SecureStorage.Default.GetAsync("accessToken");

        if (Code is not null)
        {
            await Shell.Current.GoToAsync($"//{nameof(MainPage)}");
        }
        else
        {
            await Shell.Current.GoToAsync($"//{nameof(LoginPage)}");
        }


    }

}