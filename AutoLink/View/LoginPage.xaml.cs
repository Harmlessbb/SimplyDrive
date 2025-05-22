using AutoLink.ViewModel;

namespace AutoLink
{
    public partial class LoginPage : ContentPage
    {
        public LoginPage(LogonViewModel viewModel)
        {
            InitializeComponent();
            BindingContext = viewModel;
        }
    }
}
