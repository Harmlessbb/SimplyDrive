namespace AutoLink.ViewModel;

using Microsoft.Maui.Networking;
using AutoLink.Service;
using AutoLink.ViewModel;
using CommunityToolkit.Mvvm.Input;
using System.Diagnostics;
using AutoLink.Model;
using AutoLink.View;
using CommunityToolkit.Mvvm.ComponentModel;
using System.Security.Cryptography.X509Certificates;

public partial class LogonViewModel : ObservableObject
{
    private bool isBusy = false;

    [ObservableProperty]
    private string code = "NULL1";


    UserDetails userDetails = new UserDetails();
    LoginService LoginService;

	public LogonViewModel(LoginService loginService)
	{

		this.LoginService = loginService;
	}


	[RelayCommand]
	public async Task AttemptLogin()
    {
        Debug.WriteLine("Attempt Login Function Called");
        await LoginService.attemptLogin();
        Code = LoginService.authCode;

        if (LoginService.authCode is not null)
        {
            //If we get an access code, go to the main page
            await Shell.Current.GoToAsync($"//{nameof(MainPage)}");
        }
        else
        {
            //If we don't, restart the login page which will call this function again.
            await Shell.Current.GoToAsync($"//{nameof(LoginPage)}");
        }
    }




    [RelayCommand]

    async Task ByPassLogin() //Remove this once login is implimented
    {
        await Shell.Current.GoToAsync($"//{nameof(MainPage)}");
    }



}