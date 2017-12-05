import { Injectable } from "@angular/core";
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import { Event } from '../../models/event/event.models';

@Injectable()
export class CalendarService {
    
    constructor(private db: AngularFireDatabase) {

    }

    getAllCalendarEvents() {
        return this.db.list('events', ref => ref.orderByChild('courseid'))
            .valueChanges()
                .map(res => { 
                    return res
                        .map(event => new Event(event));
                });
    }

    getCourseCalendarEvents(courseid: string) {
        return this.db.list('events', ref => ref.orderByChild('courseid')
            .equalTo(courseid))
                .valueChanges()
                    .map(res => { 
                        return res
                            .map(event => new Event(event));
                    });
    }
}