namespace AutoLink.ViewModel;

using AutoLink.Model;
using AutoLink.ViewModel;
using CommunityToolkit.Mvvm.Input;
using Microsoft.Maui.Networking;
using System.Diagnostics;
<<<<<<< HEAD
using AutoLink.Model;
using AutoLink.View;
using CommunityToolkit.Mvvm.ComponentModel;
=======
using System.Threading.Tasks;

>>>>>>> origin/XAML-TESTING-DAWID


public partial class LogonViewModel : ObservableObject
{
<<<<<<< HEAD
    [ObservableProperty]
    private bool isBusy = false;


    private string Code;

    LoginService LoginService;

	public LogonViewModel(LoginService loginService)
	{
		this.LoginService = loginService;
	}


	[RelayCommand]
	public async Task AttemptLogin()
    {

        IsBusy = true;

        Debug.WriteLine("Attempt Login Function Called");

        await LoginService.attemptLogin();
        Code = await SecureStorage.Default.GetAsync("accessToken");

        if (Code is not null)
        {
            //If we get an access code, go to the main page
            await Shell.Current.GoToAsync($"//{nameof(MainPage)}");

        }
        else
        {
            //If we don't, restart the login page which will call this function again.
            await Shell.Current.GoToAsync($"//{nameof(LoginPage)}");

        }

        IsBusy = false;
    }

=======
    [RelayCommand]
    public async Task goToMainPage()
    {
        await Shell.Current.GoToAsync($"//{nameof(MainPage)}");
    }
>>>>>>> origin/XAML-TESTING-DAWID

}