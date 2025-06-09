using Android.App;
using Android.Content.PM;
using Android.OS;       
using Android.Content;
using Microsoft.Maui.ApplicationModel;

namespace AutoLink;

[Activity(
    Theme = "@style/Maui.SplashTheme",
    MainLauncher = true,
    LaunchMode = LaunchMode.SingleTop,
    ConfigurationChanges = ConfigChanges.ScreenSize
                        | ConfigChanges.Orientation
                        | ConfigChanges.UiMode
                        | ConfigChanges.ScreenLayout
                        | ConfigChanges.SmallestScreenSize
                        | ConfigChanges.Density,
    Exported = true)]

public class MainActivity : MauiAppCompatActivity
{

    protected override void OnCreate(Bundle? savedInstanceState)
    {
        base.OnCreate(savedInstanceState);
        Microsoft.Maui.ApplicationModel.Platform.Init(this, savedInstanceState);

    }

    protected override void OnNewIntent(Intent? intent)
    {
        base.OnNewIntent(intent);
        Platform.OnNewIntent(intent);

        string? data = intent?.DataString;
        Android.Util.Log.Debug("AutoLink", $"[DEBUG] OnNewIntent received data: {data ?? "null"}");

    }
}

