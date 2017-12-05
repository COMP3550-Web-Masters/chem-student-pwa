import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ToastService } from '../../services/toast/toast.services';
import { CalendarService } from '../../services/calendar/calendar.services';
import { Subscription } from 'rxjs/Subscription';
import { Event } from '../../models/event/event.models';
import * as moment from 'moment';

/**
 * Generated class for the CourseCalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-course-calendar',
  templateUrl: 'course-calendar.html',
})
export class CourseCalendarPage {

  title = 'Course Calendar';
  courseId: string;
  calSub: Subscription;
  eventSource: Event[] = [];
  viewTitle: string;
  selectedDay = new Date();
  isToday: boolean;
  isLoading: boolean;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
    dateFormatter: {
      formatMonthViewDay: function(date:Date) {
          return date.getDate().toString();
      },
      formatMonthViewDayHeader: function(date:Date) {
          return 'MonMH';
      },
      formatMonthViewTitle: function(date:Date) {
          return 'testMT';
      },
      formatWeekViewDayHeader: function(date:Date) {
          return 'MonWH';
      },
      formatWeekViewTitle: function(date:Date) {
          return 'testWT';
      },
      formatWeekViewHourColumn: function(date:Date) {
          return 'testWH';
      },
      formatDayViewHourColumn: function(date:Date) {
          return 'testDH';
      },
      formatDayViewTitle: function(date:Date) {
          return 'testDT';
      }
    }
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private calService: CalendarService,
    private toastService: ToastService,
    private modalCtrl: ModalController) {}

  loadEvents() {
    this.isLoading = true;
    // Subscribe to the calendar service in order to get all events
    this.calSub = this.calService
      .getCourseCalendarEvents(this.courseId)
        .subscribe(events => {
          this.eventSource = events;
          this.isLoading = false;
        }, err => {
          this.toastService.showToast("Error retrieving events");
        }, () => {
          
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourseCalendarPage');
  }

  ionViewWillEnter() {
    // Load all events
    this.courseId = this.navParams.get('courseid');
    this.loadEvents();
  }

  ionViewDidLeave() {
    // Unsubscribe to all events
    this.calSub.unsubscribe();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  onEventSelected(event) {
    let modal = this.modalCtrl.create('EventModalPage', { selectedEvent: event });
    modal.present();
  }

}
