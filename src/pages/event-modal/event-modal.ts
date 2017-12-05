import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Event } from '../../models/event/event.models';

/**
 * Generated class for the EventModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {

  title: 'Event Detail';
  event: Event;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {

      this.event = this.navParams.get('selectedEvent') as Event;
      console.log(this.event);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventModalPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
