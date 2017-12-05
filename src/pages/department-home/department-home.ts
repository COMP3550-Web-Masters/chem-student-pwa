import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Event }from './../../models/event/event.models';
import { ToastService } from './../../services/toast/toast.services';
import { CourseListService } from './../../services/courses/course.service';

@IonicPage()
@Component({
  selector: 'page-department-home',
  templateUrl: 'department-home.html',
})
export class DepartmentHomePage {

  title = 'Home';
  showSpinner: boolean = true;
  eventActiityList$:Observable<Event[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private courseService: CourseListService
  ){
    this.populateEventsList();
  }

  ngOnInit(){ this.eventActiityList$.subscribe(()=>{ this.showSpinner = false; }); }

  ionViewDidLoad() { console.log('ionViewDidLoad DepartmentHomePage'); }

  populateEventsList(){
    this.eventActiityList$ = this.courseService
    .getEventsPost()
    .snapshotChanges()
    .map(
      changes => {
        return changes.map( c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      }
    )
  }

}
