namespace AutoLink.ViewModel;

using Microsoft.Maui.Networking;
using AutoLink.Service;
using AutoLink.ViewModel;
using CommunityToolkit.Mvvm.Input;
using System.Diagnostics;
using AutoLink.Model;
using AutoLink.View;
using CommunityToolkit.Mvvm.ComponentModel;


public partial class LogonViewModel : ObservableObject
{
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




}