import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';

import { SmartApp } from '../shared/services';

@Component({
    selector: 'dash',
    templateUrl: './dash.html',
    styleUrls: ['./dash.scss']
})

export class DashComponent implements OnInit {

    public key:string;
    public url:string;

    private switches = [];
    private multiSensors = [];      // Multipurpose Sensors
    private presSensors = [];       // Presense Sensors

    constructor(
                //private _cookieService: CookieService,
                private _router: Router,
                private _smartApp: SmartApp){}

    ngOnInit() {
        // Get all switches
        this._smartApp.getDevices('switches').then((data) => {
            this.switches = data;
        });

        // Get all sensors
        this._smartApp.getDevices('sensors').then((data) => {
            // Filter out multi sensors
            let ms = ["Multipurpose Sensor"];
            this.multiSensors = data.filter(function(i) {
                return ms.indexOf(i.name) > -1;})
            
            // Filter out presence sensors
            let ps = ["Mobile Presence"];
            this.presSensors = data.filter(function(i) {
                return ps.indexOf(i.name) > -1;})   
        });
    }

    public toggleSwitch(item) {
        // Only change the value of an active switch
        if (item.value) {
            item.value = item.value == 'on' ? 'off' : 'on';
            this._smartApp.toggleSwitch(item);
        }
    }

    /*
     * Get battery style
     */
    public getBattClass(item) {
        let b = +item.battery;
        switch(true) {
            case (b >= 90):
                return "mif-battery-full";
            case (b >= 60 && b < 90):
                return "mif-battery-two";
            case (b > 30 && b < 60):
                return "mif-battery-one mif-ani-heartbeat";
            default:
                return "mif-battery-empty mif-ani-flash mif-ani-slow";
        }
    }

    public getStatusClass(item) {
        
    }

    public getIcon(item) {
        if(item.type == 'sensor') switch(item.value) {
            case 'closed':
                return 'mif-lock';
            case 'open':
                return 'mif-unlock fg-red';
            case 'garage-closed':
                return 'mif-lock';
            case 'garage-open':
                return 'mif-unlock fg-red';
            default:
                return 'mif-warning fg-red';
        }
    }
}
