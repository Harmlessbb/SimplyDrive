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

        protected override void OnAppearing()
        {
            base.OnAppearing();
            viewModel.LoadCommand.Execute(null);
        }

    }



}
