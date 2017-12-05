import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-department',
  templateUrl: 'department.html',
})
export class DepartmentPage {

  tabs: Tab[] = [
    { title: 'Home', icon: 'home', root: 'DepartmentHomePage'},
    { title: 'News', icon: 'information-circle', root: 'DepartmentNewsPage' },
    { title: 'Courses', icon: 'information-circle', root: 'CoursesMgmtPage' },
  ];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DepartmentPage');
  }

}

export interface Tab {
  title: string;
  icon?: string;
  root: any;
}
