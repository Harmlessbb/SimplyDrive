using SimplyDrive.ViewModel;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using CommunityToolkit.Maui;
using SimplyDrive.Service;
using SimplyDrive.Model;

namespace SimplyDrive;

public static class MauiProgram
{

	public static MauiApp CreateMauiApp()
	{
		var builder = MauiApp.CreateBuilder();
		builder
			.UseMauiApp<App>()
			.UseMauiCommunityToolkit()
			.ConfigureFonts(fonts =>
			{
				fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
				fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
                fonts.AddFont("RAJDHANI-REGULAR.ttf", "Rajdhani");

            });


	   //Build the ViewModels
       builder.Services.AddSingleton<LogonViewModel>();
	   builder.Services.AddTransient<MainPageViewModel>();

       builder.Services.AddTransient<NewBookingsViewModel>();


	   //Build the Services
       builder.Services.AddTransient<LoginService>();
	   builder.Services.AddTransient<ActiveBookingService>();


        //Build the Models
        builder.Services.AddTransient<UserModel>();




	   //Build the Models
       


#if DEBUG
        builder.Logging.AddDebug();
#endif


		return builder.Build();
		

	}
}
