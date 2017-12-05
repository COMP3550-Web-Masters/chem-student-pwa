import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database'
import { CacheService } from 'ionic-cache';

import { Course, Enroll, CoursePost } from './../../models/course/course.model';
import { StorageService } from './../../services/storage/storage.service';

@Injectable()
export class CourseListService{

    //DB Configurations...
    private enrollmentDirectory:string = 'course-enrollment';
    private courseListDirectory:string = 'courses';
    private coursePostingDir:string = 'all-course-posts';
    private eventsPostingDir:string = 'events';
    private courseListReference = this.db.list<Course> (this.courseListDirectory);

    //Primary constructor...
    constructor(
        private db: AngularFireDatabase,
        private cache: CacheService,
        private storage: StorageService
    ){}

    //Add course...
    addCourse(course: Course){ return this.courseListReference.push(course); }

    //Get course listing...
    getCourseList(){ return this.courseListReference; }

    //Course name, studentId and reg. key needed.
    enroll(enroll: Enroll){ return this.db.list<Enroll>(this.enrollmentDirectory).push(enroll); }
    unenroll(enroll: Enroll){ return this.db.list<Enroll>(this.enrollmentDirectory).remove(enroll.key); }

    //Get list of subscribed courses...
    getEnrolledCourses(email:string){
        return this.db.list<Enroll>(
            this.enrollmentDirectory,
            ref=>ref.orderByChild('email').equalTo(email));
    }

    //Update existing course selection...
    updateCourse(course: Course){ return this.courseListReference.update(course.key, course); }

    //Remove course from subscription...
    removeCourse(course: Course){ return this.courseListReference.remove(course.key); }

    //Get post for particular course...
    getCoursePost(code:string){
        return this.db.list<CoursePost>(
            this.coursePostingDir+"/"+code,
            ref=>ref.orderByChild('code').equalTo(code));
    }

    setCoursePost(post:CoursePost){ return this.db.list<CoursePost>(this.coursePostingDir+"/"+post.code).push(post); }

    getEventsPost(){ return this.db.list<CoursePost>(this.eventsPostingDir); }
}