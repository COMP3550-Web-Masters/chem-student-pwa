import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyCoursesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-courses',
  templateUrl: 'my-courses.html',
})
export class MyCoursesPage {

  title = 'My Courses';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCoursesPage');
  }

  ionViewWillEnter() {
    
  }

  ionViewWillLeave() {
    
  }

  ionViewDidLeave() {
    
  }

}
