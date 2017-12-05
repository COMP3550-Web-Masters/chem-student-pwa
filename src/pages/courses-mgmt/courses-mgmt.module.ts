import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoursesMgmtPage } from './courses-mgmt';

@NgModule({
  declarations: [
    CoursesMgmtPage,
  ],
  imports: [
    IonicPageModule.forChild(CoursesMgmtPage),
  ],
})
export class CoursesMgmtPageModule {}
