import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CourseCalendarPage } from './course-calendar';
import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  declarations: [
    CourseCalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(CourseCalendarPage),
    NgCalendarModule,
  ],
})
export class CourseCalendarPageModule {}
