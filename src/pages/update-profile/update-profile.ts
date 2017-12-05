import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationService } from '../../services/authentication/authentication.services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast/toast.services';

/**
 * Generated class for the UpdateProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html',
})
export class UpdateProfilePage {

  updateForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth: AuthenticationService,
              public formBuilder: FormBuilder,
              public toastService: ToastService) {

    this.updateForm = this.formBuilder.group({
      'fullName': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      'departmentCode': ['', Validators.required]
    });
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateProfilePage');
  }

  ionViewWillEnter() {
    
  }

  ionViewWillLeave() {
    
  }

  ionViewDidLeave() {
    
  }

  /**
   * 
   * @param data The value of the form data when submitted
   */
  continueLogin(data: any) {
    this.auth.updateUserProfile(data.fullName, data.departmentCode).then(ok => {
      // Navigate the user to their dashboard/ homepage
      this.navCtrl.setRoot('DepartmentPage');
    }, err => {
      // console.log(err); // For debugging purposes
      switch(err.code) {
        case 'PERMISSION_DENIED':
          this.toastService.showToast('Please enter a valid code');
          break;
        default:
          this.toastService.showToast('Error updating profile');
          break;
      }
    });
  }

}
