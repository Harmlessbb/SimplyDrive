using SimplyDrive.ViewModel;

namespace SimplyDrive.View;

public partial class DevPage1 : ContentPage
{

	private DevPage1ViewModel viewModel;

	public DevPage1(DevPage1ViewModel viewModel)
	{



        BindingContext = viewModel;
        this.viewModel = viewModel;
        InitializeComponent();
	}
}