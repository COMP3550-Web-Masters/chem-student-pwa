import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepartmentHomePage } from './department-home';

@NgModule({
  declarations: [
    DepartmentHomePage,
  ],
  imports: [
    IonicPageModule.forChild(DepartmentHomePage),
  ],
})
export class DepartmentHomePageModule {}
