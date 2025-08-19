using Android.App;
using Android.Content;
using Android.Content.PM;
using Microsoft.Maui.Authentication;

namespace SimplyDrive.Platforms.Android;

[Activity(LaunchMode = LaunchMode.SingleTop, Exported = true)]
[IntentFilter(
    new[] { Intent.ActionView },
    Categories = new[] {
        Intent.CategoryDefault,
        Intent.CategoryBrowsable },
    DataScheme = "maui",
    DataHost = "callback")]

public class WebAuthenticationCallbackActivity : WebAuthenticatorCallbackActivity
{

}