using CommunityToolkit.Mvvm.ComponentModel;
using SimplyDrive.Model;
using SimplyDrive.Service;
using SimplyDrive.ViewModel;
using System.Diagnostics;
using System.Text.Json;
using System.Web;

namespace SimplyDrive.View
{
    public partial class LoginPage : ContentPage
    {

        private const string KeycloakBaseUrl = "https://auth.simplydrive.app/realms/SimplyDrive";
        private const string ClientId = "SimplyDriveApp";
        private const string RedirectUri = "maui://callback";
        private const string Scope = "openid profile email";
        private const string ResponseType = "code";

        private LogonViewModel _logonViewModel;

        public LoginPage()
        {
            InitializeComponent();

            _logonViewModel = new LogonViewModel();

            var authUrl = $"{KeycloakBaseUrl}/protocol/openid-connect/auth" +
                          $"?client_id={ClientId}" +
                          $"&redirect_uri={Uri.EscapeDataString(RedirectUri)}" +
                          $"&response_type={ResponseType}" +
                          $"&scope={Uri.EscapeDataString(Scope)}";

            LoginWebView.Source = authUrl;


        }

        private async void LoginWebView_Navigating(object sender, WebNavigatingEventArgs e)
        {
            if (e.Url.StartsWith(RedirectUri, StringComparison.OrdinalIgnoreCase))
            {
                e.Cancel = true; // stop WebView from actually navigating away

                var uri = new Uri(e.Url);
                var query = HttpUtility.ParseQueryString(uri.Query);
                var code = query["code"];

                if (!string.IsNullOrEmpty(code))
                {
                    await ExchangeCodeForTokens(code);
                }
            }
        }

        private async Task ExchangeCodeForTokens(string code)
        {
            using var client = new HttpClient();

            var tokenEndpoint = $"{KeycloakBaseUrl}/protocol/openid-connect/token";
            var data = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("grant_type", "authorization_code"),
                new KeyValuePair<string, string>("code", code),
                new KeyValuePair<string, string>("redirect_uri", RedirectUri),
                new KeyValuePair<string, string>("client_id", ClientId)

            });

            var response = await client.PostAsync(tokenEndpoint, data);
            var content = await response.Content.ReadAsStringAsync();


            var jsonDoc = JsonDocument.Parse(content);
            string accessToken = jsonDoc.RootElement.GetProperty("access_token").GetString();

            await SecureStorage.Default.SetAsync("accessToken", $"{accessToken}");

            Debug.WriteLine($"accessToken: {accessToken}");

            _logonViewModel.ValidateLogin();

        }
    }
}

