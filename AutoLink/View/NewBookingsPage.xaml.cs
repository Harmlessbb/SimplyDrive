using AutoLink.ViewModel;

namespace AutoLink.View;

public partial class NewBookingsPage : ContentPage
{
	private NewBookingsViewModel viewModel;

	public NewBookingsPage(NewBookingsViewModel viewModel)
	{
        BindingContext = viewModel;
        this.viewModel = viewModel;
        InitializeComponent();
	}
}