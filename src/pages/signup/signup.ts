import { ToastService } from './../../services/toast/toast.services';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthenticationService } from '../../services/authentication/authentication.services'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
    
    signupForm: FormGroup;

    constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthenticationService,
    public formBuilder: FormBuilder,
    private toastService: ToastService) {

        // Defines the validation rules for form elements of the given name
        this.signupForm = this.formBuilder.group({
            'email': ['', Validators.compose([Validators.required, Validators.email])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SignupPage');
    }

    ionViewWillEnter() {
        
    }

    ionViewWillLeave() {
    
    }

    ionViewDidLeave() {
    
    }

    /**
     * Registers a user account and if successful, directs the user to their home/ dashboard page
     * @param user The user object return from the form when the signup button is clicked
     */
    signup(user: any){
        this.auth.signup(user.email, user.password).then(ok => {

            // Let the user update their profile before continuing
            this.navCtrl.setRoot('UpdateProfilePage');
           
        }, err => {
            console.log(err.code);

            // Reference for firebase error codes:
            // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createUserWithEmailAndPassword
            switch(err.code){
                case 'auth/email-already-in-use':
                    this.toastService.showToast('Email already in use');
                    break;
                case 'auth/invalid-email':
                    this.toastService.showToast('Invalid email');
                    break;
                case 'auth/weak-password':
                    this.toastService.showToast('Weak password');
                    break;
                case 'auth/operation-not-allowed':
                    console.log('Operation not allowed');
                default:
                    this.toastService.showToast('Signup failed. Try again');
            }
            this.signupForm.reset(); // Reset the contents in the form
        });
    }

    /**
     * Directs the user to the login page
     */
    goToLogin() {
        this.navCtrl.setRoot('LoginPage');
    }

}
