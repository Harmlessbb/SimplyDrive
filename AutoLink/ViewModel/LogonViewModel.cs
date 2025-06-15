namespace AutoLink.ViewModel;

using AutoLink.Model;
using AutoLink.ViewModel;
using CommunityToolkit.Mvvm.Input;
using Microsoft.Maui.Networking;
using System.Diagnostics;
using System.Threading.Tasks;


public partial class LogonViewModel : ContentPage
{
    [RelayCommand]
    public async Task goToMainPage()
    {
        await Shell.Current.GoToAsync($"//{nameof(MainPage)}");
    }

}