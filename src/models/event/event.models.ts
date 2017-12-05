export class Event {
    title: string;
    notes: string;
    objectid: string;
    allDay: boolean;
    startTime: Date;
    endTime: Date;
    location: string;

    constructor(event) {
        this.title = event.title;
        this.notes = event.notes || '';
        this.objectid = event.objectid;
        this.allDay = event.allDay;
        this.startTime = new Date(event.startTime);
        this.endTime = new Date(event.endTime);
        this.location = event.location || '';
    }
}