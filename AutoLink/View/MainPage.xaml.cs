using AutoLink.ViewModel;

namespace AutoLink
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

        async void OnButtonClicked(object sender, EventArgs args)
        {
            await label.RelRotateTo(360, 1000);
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();
            viewModel.LoadCommand.Execute(null);
        }

    }



}
