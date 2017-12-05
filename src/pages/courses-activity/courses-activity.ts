import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Course, CoursePost, Enroll } from './../../models/course/course.model';
import { ToastService } from './../../services/toast/toast.services';
import { CourseListService } from './../../services/courses/course.service';

@IonicPage()
@Component({
  selector: 'page-courses-activity',
  templateUrl: 'courses-activity.html',
})
export class CoursesActivityPage {
  post: CoursePost = {
    code: '',
    author: '',
    title: '',
    preview: '',
    body: '',
    type: '',
    extras: '',
    important: undefined
  }

  enroll: Enroll = {
    email: '',
    code: '',
    course: undefined
}

  //Class variables...
  course: Course;
  showSpinner: boolean = true;
  courseActiityList$:Observable<CoursePost[]>;

  ngOnInit(){ this.courseActiityList$.subscribe(()=>{ this.showSpinner = false; }); }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private courseService: CourseListService,
    private toast: ToastService
  ){
    //this.pushNewPost(); //For testing...
  }

  ionViewWillLoad() {
    this.course = this.navParams.get('course');
    this.enroll = this.navParams.get('enrollObj');
    this.populateActivityList(this.enroll.code);
  }

  populateActivityList(code:string){
    this.courseActiityList$ = this.courseService
    .getCoursePost(code)
    .snapshotChanges()
    .map(
      changes => {
        return changes.map( c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      }
    )
  }

  //For testing...
  pushNewPost(){
    this.post.author="Author/ Lecturer";
    this.post.code = "CHEM1062";
    this.post.important = true;
    this.post.title = "Post Title";
    this.post.preview = "Urgent notice to all students.";
    this.post.type = "info";
    this.post.body = "Simple post body describing/ explaing something. Created from the lecturer and viewed bystudents!";

    this.courseService.setCoursePost(this.post).then(ref=>{
      this.toast.show(`${this.post.code} added successfully!`);
    }, (err)=>{
      this.toast.show(`${this.post.code} not added!`);
    })
  }

}
