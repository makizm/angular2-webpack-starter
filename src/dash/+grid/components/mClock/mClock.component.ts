import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'clock-widget',
    templateUrl: './mClock.html',
    styleUrls: ['./mClock.scss']
    // changeDetection: ChangeDetectionStrategy.OnPush
})

export class mClockComponent implements OnInit {

    public time;
    public day;
    public month;
    public week;

    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        setInterval(() => {this.getTime()}, 500);
    }

    private getTime() {
        let weekday = new Array(7);
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";
            
        let today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        this.day = today.getDate();
        this.month = today.getMonth();
        this.week = weekday[today.getDay()];
        m = checkTime(m);

        if (s % 2 == 0) {
            this.time = h + ":" + m;
        } else {
            this.time = h + ":" + m;
        }

        function checkTime(i) {
            if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
            return i;
        }
    }
}