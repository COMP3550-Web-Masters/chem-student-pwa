import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CalendarService } from '../../services/calendar/calendar.services';
import { ToastService } from '../../services/toast/toast.services';
import { Event } from '../../models/event/event.models';
import { AuthenticationService } from '../../services/authentication/authentication.services';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  title = 'Calendar';
  calSub: Subscription;
  eventSource: Event[];
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }

  ionViewWillEnter() {
    // Load all events
    this.loadEvents();
  }

  ionViewDidLeave() {
    // Unsubscribe to all events
    this.calSub.unsubscribe();
  }

  loadEvents() {
    this.isLoading = true;
    // Subscribe to the calendar service in order to get all events
    this.calSub = this.calService.getAllCalendarEvents().subscribe(events => {
      this.eventSource = events;
      this.isLoading = false;
    }, err => {
      this.toastService.showToast("Error retrieving events");
    }, () => {

    });
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
    // console.log(event);
    let modal = this.modalCtrl.create('EventModalPage', { selectedEvent: event });
    modal.present();

  }

}
