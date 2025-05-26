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
        if (!string.IsNullOrWhiteSpace(userInputUsername) && !string.IsNullOrWhiteSpace(userInputPassword))
        {
            Debug.WriteLine("Attempting Login... ");
            if (isBusy == true)
            {
                return;
            }

            try
            {
                Debug.WriteLine($"User Input Password: {userInputPassword}... Attempting Logon to User ");
                IsBusy = true;
                userDetails = await LoginService.GetLoginInfo(this);

                Debug.WriteLine($"userDetails.password: {userDetails.Password} userDetails.username {userDetails.Username}");

                if (userInputPassword == userDetails.Password && userInputUsername == userDetails.Username)
                {
                    Debug.WriteLine($"USER ID IS: {userDetails.UserId}");
                    Debug.WriteLine($"USERNAMEOK! {userDetails.Username}");
                    await Shell.Current.GoToAsync($"//{nameof(MainPage)}");
                    IsBusy = false;
                }
                else
                {
                    await Shell.Current.DisplayAlert("Could Not Log In", "Incorrect Username or Password", "Try Again");
                    IsBusy = false;
                }
            }

            catch (Exception ex)
            {
                await Shell.Current.DisplayAlert("Error!", $"{ex.Message}", "ok");
                isBusy = false;
            }
        }
        else
        {
            await Shell.Current.DisplayAlert("Error!", $"No Input", "ok");

        }
    }

    [RelayCommand]

    async Task GoToSignUpScreen() 
    {
        await Shell.Current.GoToAsync($"//{nameof(SignUpPage)}");
    }


}