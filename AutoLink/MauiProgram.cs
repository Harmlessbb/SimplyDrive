using AutoLink.Model;
using AutoLink.Service;
using AutoLink.ViewModel;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using CommunityToolkit.Maui;

namespace AutoLink;

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
       builder.Services.AddTransient<SignUpViewModel>();

	   //Build the Models
       builder.Services.AddSingleton<LoginService>();
	   builder.Services.AddSingleton<VehicleService>();
		

#if DEBUG
        builder.Logging.AddDebug();
#endif


		return builder.Build();
		

	}
}
