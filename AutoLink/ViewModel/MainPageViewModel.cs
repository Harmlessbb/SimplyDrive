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

    LogonViewModel logonViewModel;
    LoginService loginService;
    MakeAnApiCallService makeAnApiCallService;

    public MainPageViewModel(LoginService loginService, MakeAnApiCallService makeAnApiCallService)
    {

        this.loginService = loginService;
        this.logonViewModel = new LogonViewModel(loginService);

        this.makeAnApiCallService = makeAnApiCallService;

    }

    [RelayCommand]
    async Task attemptApiCall()
    {
        string _token = TokenModel.accessToken;
        await makeAnApiCallService.MakeApiCallAsync(_token);
        await Shell.Current.DisplayAlert("API Call", $"Access token: {_token}, Value Returned: {makeAnApiCallService.apiResponse}", "OK");
    }

}
