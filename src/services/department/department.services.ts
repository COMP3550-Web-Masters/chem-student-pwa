import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthenticationService } from '../authentication/authentication.services';
import { User } from '../../models/user/user.models';
import { Lecturer } from '../../models/lecturer/lecturer.models';
import firebase from 'firebase';

import { DepartmentMessage } from './../../models/department/department.model';

@Injectable()
export class DepartmentService {
    dept: DepartmentMessage = {
        deptKey: '',
        message: ''
    }

    departmentCode: string;
    private deptReference = this.db.list<string> ('depdetails');

    constructor(
        private db: AngularFireDatabase,
        private auth: AuthenticationService
    ) {
        if(this.auth.isLoggedIn()) {
            this.auth.getUser().subscribe((user: User) => {
                if(user) {
                    console.log('Department Code: ' + user.departmentCode);
                    this.departmentCode = user.departmentCode;
                }
            })
        }
    }

    getLecturers() {
        if(!this.departmentCode) return;
        this.db.list<Lecturer>('lecturers/').valueChanges();
    }

    postToDepartment(message: string){
        const post = { message, 'timestamp': firebase.database.ServerValue.TIMESTAMP };
        return this.deptReference.push(post.message);
    }

    getDepartmentPosts(){ return this.deptReference; }
}