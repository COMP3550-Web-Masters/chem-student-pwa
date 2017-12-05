import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { StorageService } from './../../services/storage/storage.service';

import { CourseListService } from './../../services/courses/course.service'
import { ToastService } from './../../services/toast/toast.services'; 
import { Course, Enroll } from './../../models/course/course.model'; 


@IonicPage()
@Component({
  selector: 'page-courses-details',
  templateUrl: 'courses-details.html',
})
export class CoursesDetailsPage {
  reg: Enroll = {
    code:'',
    email: '',
    course: undefined
  }
  
  course:Course = {
    code: '',
    name: '',
    year: undefined,
    credits: undefined,
    semester: undefined,
    faculty: '',
    lecturer: '',
    officeHours: '',
    officeLocation: '',
    prerequisite: '',
    department: '',
    summary: ''
  }
  
  //Class variables...
  enrollObj: Enroll;
  enrolled: boolean;
  email: string;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private toast: ToastService,
    private courseService: CourseListService,
    private storage: StorageService
  ) {
    this.storage.getFromStorage('email').then((val) => {
      this.email = val;
    })
  }

  ionViewWillLoad() {
    this.enrolled = this.navParams.get('enrolled');
    if(this.enrolled){
      this.enrollObj = this.navParams.get('enrollObj');
      this.course = this.enrollObj.course;
    }
    else this.course = this.navParams.get('course');
  }
  
  //Enroll to course...
  enroll(course: Course){
    this.reg.code = course.code;
    this.reg.email = this.email;
    this.reg.course = course;
    this.courseService.enroll(this.reg).then(()=>{
      this.toast.show(this.reg.code+" Added successfully!!!");
      this.navCtrl.setRoot('CoursesMgmtPage');
    });
  }
  
  //Unenroll from course...
  unenroll(enroll: Enroll) {
    let confirm = this.alertCtrl.create({
      title: 'Confirm unenroll!',
      message: 'Do you really want to unenroll from '+enroll.code+'?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => { }
        },
        {
          text: 'Agree',
          handler: () => {
            this.courseService.unenroll(enroll).then(()=>{
              this.toast.show("Unenrolled from "+enroll.code);
              this.navCtrl.setRoot("CoursesMgmtPage");
            })
          }
        }
      ]
    });
    confirm.present();
  }
}