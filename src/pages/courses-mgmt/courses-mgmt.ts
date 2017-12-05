import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Course, Enroll } from './../../models/course/course.model';
import { CourseListService } from './../../services/courses/course.service';
import { ToastService } from './../../services/toast/toast.services';
import { StorageService } from './../../services/storage/storage.service'

@IonicPage()
@Component({
  selector: 'page-courses-mgmt',
  templateUrl: 'courses-mgmt.html',
})
export class CoursesMgmtPage {
  //Model: Get courses/ listing...
  course: Course = {
    code:'',
    name:'',
    year: undefined,
    semester: undefined,
    faculty: '',
    department: '',
    credits: undefined,
    lecturer: '',
    officeHours: '',
    officeLocation: '',
    prerequisite: '',
    summary: ''
  }

  courseList$: Observable<Course[]>;  //Course List Observable object...
  enrolledCourseList$: Observable<Enroll[]>;  //Course List Observable object...
  cachedEnrollmentList$: Observable<Enroll[]>;
  viewAll: boolean = true;
  pageName: string = "Courses";
  showSpinner: boolean = true;
  options:string;
  noEnrollment: boolean;
  email:string = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private courseListService: CourseListService,
    private toast: ToastService,
    private storage: StorageService 
  ) {
    //Get stored email...
    this.storage.getFromStorage('email')
    .then(res=>{
      this.email = res;
    })

    this.noEnrollment = true;
    this.options = "all";

    //Get copurse listing...
    this.courseList$ = this.courseListService
      .getCourseList()
      .snapshotChanges()
      .map(
        changes => {
          return changes.map( c => ({
            key: c.payload.key, ...c.payload.val()
          }))
        }
      )
      this.getEnrolledCourses();
  }

  getEnrolledCourses(){
    //Get subscribed/ enrolled course listing...
    this.enrolledCourseList$ = this.courseListService
    .getEnrolledCourses(this.email)
    .snapshotChanges()
    .map(
      changes => {
        return changes.map( c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      }
    )

    this.enrolledCourseList$.subscribe((res)=>{
      this.showSpinner = false;
      if(!res || (!res[0].email || res[0].email===undefined)) this.noEnrollment = true;
      else this.noEnrollment = false;
    });
  }

  ngOnInit(){
    this.courseList$.subscribe(()=>{ this.showSpinner = false; });
    this.enrolledCourseList$.subscribe(()=>{ this.showSpinner = false; });
  }

  ionViewDidLoad() { console.log('Page loaded: AddCoursePage'); }

  addCourse(course: Course){
    this.courseListService.addCourse(course).then(ref=>{
      this.toast.show(`${course.name} added successfully!`); //Template literal [ES6/ ES2015]
      this.navCtrl.setRoot('HomePage', { key: ref.key });
    })
  }

  //Select all courses...
  selectAll(){
    if(!this.viewAll){
      this.toast.show("All Courses");
      this.viewAll = true;
      this.options = "all";
    }
  }

  //Select subscribed/ favourite courses...
  selectEnrolled(){
    if(this.viewAll){
      this.getEnrolledCourses();
      this.toast.show("Enrolled Courses");
      this.options = "fav";
      this.viewAll = false;
    }
  }
}
