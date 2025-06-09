using AutoLink.Model;
using AutoLink.Service;
using AutoLink.ViewModel;

namespace AutoLink
{
    public partial class LoginPage : ContentPage
    {
        public LoginPage(LogonViewModel viewModel)
        {
            InitializeComponent();
            BindingContext = viewModel;
            AttemptLoginAsync(viewModel);

        }
        private async Task AttemptLoginAsync(LogonViewModel viewModel)
        {
            await viewModel.AttemptLogin();
        }
    }
}
