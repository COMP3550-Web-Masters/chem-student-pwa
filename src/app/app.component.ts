import { ToastService } from './../services/toast/toast.services';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthenticationService } from '../services/authentication/authentication.services';
import { CacheService } from "ionic-cache";

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  
  pages: PageInterface[] = [
    { title: 'My Department', component: 'DepartmentPage' },
    { title: 'Calendar', component: 'CalendarPage' },
  ];

  rootPage:string = 'LoginPage'; 

  @ViewChild(Nav) nav: Nav;


  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public auth: AuthenticationService,
    public cache: CacheService,
    public toastService: ToastService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      cache.setDefaultTTL(60 * 60 * 12); // Set TTL to 12h
      cache.setOfflineInvalidate(false); // Keep our cached results when device is offline!

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(pageComponent: string) {
    console.log('Redirecting to: ' + pageComponent);
    this.nav.setRoot(pageComponent);
  }

  logout() {

    this.nav.setRoot('LoginPage').then(() => {
      this.auth.signOut().then(() => {
        this.toastService.showToast('Logged out successfully');
      }, err => {
        console.error(err);
        this.toastService.showToast('Error login out');
      })
    });
  }
}

export interface PageInterface {
  title: string;
  component: string;
}

