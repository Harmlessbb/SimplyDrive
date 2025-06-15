using CommunityToolkit.Mvvm.ComponentModel;
using AutoLink.Service;


namespace AutoLink.ViewModel;



public partial class MainPageViewModel : ObservableObject
{

    [ObservableProperty]
    string userName = string.Empty;

    LogonViewModel logonViewModel;
    LoginService loginService;
    MakeAnApiCallService makeAnApiCallService;

    public MainPageViewModel(LoginService loginService, MakeAnApiCallService makeAnApiCallService)
    {

        this.loginService = loginService;
        this.logonViewModel = new LogonViewModel(loginService);
        this.makeAnApiCallService = makeAnApiCallService;

        _ = Initialize();
    }

    private async Task Initialize()
    {
 
        string _token = await SecureStorage.Default.GetAsync("accessToken");

        await loginService.getUserInfo(_token);
        await makeAnApiCallService.MakeApiCallAsync(_token);

        if (loginService.UserInfo != null)
        {
            UserName = loginService.UserInfo.firstName;

        }
        else
        {
            await Shell.Current.DisplayAlert("Error", "User info not loaded.", "OK");
        }

    }

}
