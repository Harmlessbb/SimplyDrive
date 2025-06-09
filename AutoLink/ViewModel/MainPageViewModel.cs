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
    VehicleDetails? vehicleDetails;
    UserDetails? userDetails;

    LoginService loginService;


    public MainPageViewModel(LoginService loginService)
    {

        this.loginService = loginService;
        this.logonViewModel = new LogonViewModel(loginService);

    }



}
