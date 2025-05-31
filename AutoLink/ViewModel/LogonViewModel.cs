namespace AutoLink.ViewModel;

using Microsoft.Maui.Networking;
using AutoLink.Service;
using AutoLink.ViewModel;
using CommunityToolkit.Mvvm.Input;
using System.Diagnostics;
using AutoLink.Model;
using AutoLink.View;

public partial class LogonViewModel : ContentPage
{
    private bool isBusy = false;

    //PASSWORD AND USERNAME HANDLING
    private string passwordUpdate = "";

    public string userInputPassword
	{
		get =>	passwordUpdate;
		set
		{
            if (userInputPassword != value)
            {
                passwordUpdate = value;
                OnPropertyChanged();
            }
        }
    }

    private string usernameUpdate = "";

    public string userInputUsername
    {
        get => usernameUpdate;
        set
        {
            if (userInputUsername != value)
            {
                usernameUpdate = value;
                OnPropertyChanged();
            }
        }
    }


    UserDetails userDetails = new UserDetails();
    LoginService LoginService;

	public LogonViewModel(LoginService loginService)
	{
		Title = "AutoLink";
		this.LoginService = loginService;
	}


	[RelayCommand]
	async Task AttemptLogin()
    {
        Debug.WriteLine("Attempt Login Function Called");
        await LoginService.RetrieveDBInfo();
    }


    [RelayCommand]
    async Task GoToSignUpScreen() 
    {
        await Shell.Current.GoToAsync($"//{nameof(SignUpPage)}");
    }


    [RelayCommand]

    async Task ByPassLogin() //Remove this once login is implimented
    {
        await Shell.Current.GoToAsync($"//{nameof(MainPage)}");
    }



}