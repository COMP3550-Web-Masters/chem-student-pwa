import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepartmentNewsPage } from './department-news';

@NgModule({
  declarations: [
    DepartmentNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(DepartmentNewsPage),
  ],
})
export class DepartmentNewsPageModule {}
