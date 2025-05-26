namespace AutoLink.View;
using AutoLink.ViewModel;


public partial class SignUpPage : ContentPage
{
	public SignUpPage(SignUpViewModel viewModel)
	{
		InitializeComponent();
        BindingContext = viewModel;
    }
    protected override void OnAppearing()
    {

        //Make sure all fields are empty when the Page Loads
        base.OnAppearing();
        if (BindingContext is SignUpViewModel vm)
        {
            vm.SignUpPhase1 = true;
            vm.SignUpPhase2 = false;
            vm.userInputUsername = "";
            vm.userInputPassword = "";
            vm.userInputPasswordConfirm = "";
            vm.userInputFirstName = "";
            vm.userInputLastName = "";
        }
    }

}