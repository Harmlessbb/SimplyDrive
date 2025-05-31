namespace AutoLink.ViewModel;

using AutoLink.Service;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



public partial class SignUpViewModel : ObservableObject
{
        private readonly SignUpService _signUpService;
        private readonly LoginService _loginService;
        public SignUpViewModel()
            {
                _signUpService = new SignUpService();
                _loginService = new LoginService();
            }


 
        

        //update ViewModel Variables to User Input

        //Email
        private string usernameUpdate = "";

        public string userInputUsername
        {
            get => usernameUpdate;
            set
            {
                if (userInputUsername != value)
                {
                    usernameUpdate = value;
                    OnPropertyChanged();
                }
            }
        }

        //Password
        private string passwordUpdate = "";

        public string userInputPassword
        {
            get => passwordUpdate;
            set
            {
                if (userInputPassword != value)
                {
                    passwordUpdate = value;
                    OnPropertyChanged();
                }
            }
        }

        //Password Confirmation
        private string passwordConfirmUpdate = "";

        public string userInputPasswordConfirm
        {
            get => passwordConfirmUpdate;
            set
            {
                if (userInputPasswordConfirm != value)
                {
                    passwordConfirmUpdate = value;
                    OnPropertyChanged();
                }
            }
        }

        //First Name
        private string firstNameUpdate = "";

            public string userInputFirstName
            {
                get => firstNameUpdate;
                set
                {
                    if (userInputFirstName != value)
                    {
                    firstNameUpdate = value;
                        OnPropertyChanged();
                    }
                }
            }

        //Last Name
        private string lastNameUpdate = "";

        public string userInputLastName
        {
            get => lastNameUpdate;
            set
            {
                if (userInputLastName != value)
                {
                    lastNameUpdate = value;
                    OnPropertyChanged();
                }
            }
        }



    // Command called when the user presses the button to sign up.
    // We Need to make a few checks, is the email already in use? is it a valid email? is the confirm password the same as the first input? Did the user actually enter anything?
    // This will have to be optimized later, there has to be a better way than 1 million if statements

    //These bools are used to toggle visibility of Input fields, phase 1 asks for Email + pass, phase 2 asks for first and last name
    public bool SignUpPhase1
    {
        get => signUpPhase1;
        set
        {
            if (signUpPhase1 != value)
            {
                signUpPhase1 = value;
                OnPropertyChanged();
            }
        }
    }
    private bool signUpPhase1 = true;

    public bool SignUpPhase2
    {
        get => signUpPhase2;
        set
        {
            if (signUpPhase2 != value)
            {
                signUpPhase2 = value;
                OnPropertyChanged();
            }
        }
    }
    private bool signUpPhase2 = false;


    [RelayCommand]
    async Task AttemptSignUpPhase1()
    { 

    }

    [RelayCommand]
    async Task AttemptSignUpPhase2()
    {
       
    }

    [RelayCommand]
    async Task ReturnToMenu()
    {
        await Shell.Current.GoToAsync($"//{nameof(LoginPage)}");
    }

}

