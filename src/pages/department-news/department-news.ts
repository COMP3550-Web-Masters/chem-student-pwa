import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DepartmentService } from './../../services/department/department.services';
import { ToastService } from './../../services/toast/toast.services'; 
import { StorageService } from './../../services/storage/storage.service';
import { DepartmentMessage } from './../../models/department/department.model';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-department-news',
  templateUrl: 'department-news.html',
})
export class DepartmentNewsPage {
  dept: DepartmentMessage = {
    deptKey: '',
    message: ''
  }
  
  deptMsgList$: Observable<string[]>;
  title = 'Department - News';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private deptService: DepartmentService,
    private toast: ToastService,
    private storage: StorageService
  ) {
    //Get subscribed/ enrolled course listing...
    this.deptMsgList$ = this.deptService
    .getDepartmentPosts()
    .snapshotChanges()
    .map(
      changes => {
        return changes.map( c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DepartmentNewsPage');
  }

  //Push post to department...
  postToDepartment(str:string){
    this.deptService.postToDepartment(str);
  }

  //Get posts...
  getDepartmentPosts(){

    /*
        SimpleDateFormat sfd = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        sfd.format(new Date(timestamp))
    */
  }
}
