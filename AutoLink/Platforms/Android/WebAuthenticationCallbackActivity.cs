using Android.App;
using Android.Content.PM;
using Microsoft.Maui.Authentication;

namespace AutoLink;

[Activity(LaunchMode = LaunchMode.SingleTop, Exported = true)]
[IntentFilter(
    new[] { Android.Content.Intent.ActionView },
    Categories = new[] {
    Android.Content.Intent.CategoryDefault,
        Android.Content.Intent.CategoryBrowsable },

    DataScheme = "maui",
    DataHost = "callback")]

public class WebAuthenticationCallbackActivity : WebAuthenticatorCallbackActivity
{

}