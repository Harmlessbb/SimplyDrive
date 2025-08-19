using SimplyDrive.ViewModel;

namespace SimplyDrive.View
{
    public partial class MainPage : ContentPage
    {

        private MainPageViewModel viewModel;

        public MainPage(MainPageViewModel viewModel)
        {
            BindingContext = viewModel;
            this.viewModel = viewModel;
            InitializeComponent();
        }

        protected override async void OnAppearing()
        {
            base.OnAppearing();
            await viewModel.Initialize();
        }

    }



}
