import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FIREBASE_CONFIG } from '../firebase.credentials';
import { MyApp } from './app.component';
import { CacheModule } from 'ionic-cache';
import { IonicStorageModule } from '@ionic/storage';

import { ToastService } from '../services/toast/toast.services';
import { CalendarService } from '../services/calendar/calendar.services';
import { AuthenticationService } from '../services/authentication/authentication.services';
import { CourseListService } from './../services/courses/course.service';
import { StorageService } from './../services/storage/storage.service';
import { DepartmentService } from './../services/department/department.services';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule, 
    CacheModule.forRoot(),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthenticationService,
    CalendarService,
    ToastService,
    CourseListService,
    StorageService,
    DepartmentService
  ]
})
export class AppModule {}
