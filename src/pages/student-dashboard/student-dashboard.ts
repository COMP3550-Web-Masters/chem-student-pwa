import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationService } from '../../services/authentication/authentication.services';

/**
 * Generated class for the StudentDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-student-dashboard',
  templateUrl: 'student-dashboard.html',
})
export class StudentDashboardPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private auth: AuthenticationService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentDashboardPage');
    console.log(this.auth.isLoggedIn());
  }

}
