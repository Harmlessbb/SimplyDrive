using Android.App;
using Android.Content.PM;
using Android.Runtime;
using SimplyDrive;

namespace SimplyDrive.Platforms.Android;



[Application]
public class MainApplication : MauiApplication
{
	public MainApplication(nint handle, JniHandleOwnership ownership)
		: base(handle, ownership)
	{
	}

	protected override MauiApp CreateMauiApp() => MauiProgram.CreateMauiApp();
}
