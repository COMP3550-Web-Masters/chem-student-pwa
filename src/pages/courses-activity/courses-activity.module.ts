import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoursesActivityPage } from './courses-activity';

@NgModule({
  declarations: [
    CoursesActivityPage,
  ],
  imports: [
    IonicPageModule.forChild(CoursesActivityPage),
  ],
})
export class CoursesActivityPageModule {}
