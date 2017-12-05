import { AuthenticationService } from './../../services/authentication/authentication.services';
import { Component, trigger, transition, style, state, animate, keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { ToastService } from '../../services/toast/toast.services';
import { StorageService } from './../../services/storage/storage.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',

  //Animations - Angular4...
  animations: [
    trigger('bounce', [
      state('*', style({
        transform: 'translateX(0)'
      })),
      transition('* => rightSwipe', animate('700ms ease-out', keyframes([
        style({transform: 'translateX(0)', offset: 0}),
        style({transform: 'translateX(-65px)', offset: .3}),
        style({transform: 'translateX(0)', offset: 1})
      ]))),
      transition('* => leftSwipe', animate('700ms ease-out', keyframes([
        style({transform: 'translateX(0)', offset: 0}),
        style({transform: 'translateX(65px)', offset: .3}),
        style({transform: 'translateX(0)', offset: 1})
      ])))
    ])
  ] //End animations array...
})
export class LoginPage {
  title: string = "Login";

  completeSub: Subscription;
  loginForm: FormGroup;

  skipMsg: string = "Skip";
  state: string = 'x';
  splash: boolean;  //Status of splash screen...

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthenticationService,
    public formBuilder: FormBuilder,
    private toastService: ToastService,
    private storage: StorageService) {

      // Defines the validation rules for form elements of the given name
      this.loginForm = this.formBuilder.group({
        'email': [null, Validators.compose([Validators.required, Validators.email])],
        'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])]
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewWillEnter() {
    
  }

  ionViewWillLeave() {
    
  }

  ionViewDidLeave() {
    // Unsubscribe to all events
    if(this.completeSub) {
      this.completeSub.unsubscribe();
    }
  }

  /**
   * Logs a user in and directs them to their home page/ dashboard
   * @param user The user object retrieved from the login form after submit
   */
  login(user: any){
    // console.log('Login clicked');
    this.auth.login(user.email, user.password).then(isCompleted => {
      this.storage.addToStorage('email', user.email);

      this.completeSub = isCompleted.subscribe(res => {  
        if(res == true) {
          // Get the page name that is passed as a parameter if any
          let page = this.navParams.get('pageName') || undefined;

          if(page != undefined) {
            // A page is specified from the parameter
            this.navCtrl.setRoot(page);
          }
          else {
            // A page is not specified and proceed to the home page
            this.navCtrl.setRoot('DepartmentPage'); // TODO: Change to page created by Stephan
          }
          
        }
        else {
          // Let the user complete their profile by sending them to the relevant page to continue
          this.navCtrl.setRoot('UpdateProfilePage');
        }

      }, err => {

        // console.log(err);
        this.toastService.showToast('Please try again');
        this.loginForm.reset(); // Reset the contents of the form
      });

    }, err => {
      
      // console.error(err);
      // Reference for firebase error codes:
      // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createUserWithEmailAndPassword

      switch(err.code) {
        case 'auth/user-not-found':
          this.toastService.showToast('Email not found');
          break;
        case 'auth/wrong-password':
          this.toastService.showToast('Invalid password');
          break;
        case 'auth/network-request-failed':
          this.toastService.showToast('Cannot connect to network');
          break;
        default:
          this.toastService.showToast('Invalid email or password');
      }
      this.loginForm.reset(); // Reset the contents of the form
    });
  }

  /**
   * Directs the user to the signup page
   */
  goToSignup(){
    this.navCtrl.setRoot('SignupPage');
  }


}
