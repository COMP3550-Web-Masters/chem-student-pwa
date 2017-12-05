import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoursesDetailsPage } from './courses-details';

@NgModule({
  declarations: [
    CoursesDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CoursesDetailsPage),
  ],
})
export class CoursesDetailsPageModule {}
