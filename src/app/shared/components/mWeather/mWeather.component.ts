import { Component, OnInit, ElementRef } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { mWeatherProvider } from '../../services';

const CHECK_WEATHER_INTERVAL = 5;  // in minutes

@Component({
    selector: 'weather-widget',
    templateUrl: 'mWeather.html',
    styleUrls: ['mWeather.scss']
})

export class mWeatherComponent implements OnInit {

    public city;
    public iconClass: string;
    public temperature: number;
    public tempMax: number;
    public tempMin: number;

    constructor(private _weather: mWeatherProvider, private _elem: ElementRef) {
        this._weather.city = 'Baltimore';
    }

    ngOnInit() {
        // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        // Add 'implements OnInit' to the class.
        this.city = this._weather.city;
        this._getWeather();
        //this._weather.getByCity().then(this.getWeather);
        IntervalObservable.create(CHECK_WEATHER_INTERVAL * 60000).subscribe(data=> {
            console.log('check');
            this._getWeather();
        });
    }

    private _getWeather():void {
        this._weather.test().subscribe(res => {
            let data = res.json();
            let icon = data['weather'][0]['icon'];
            this.iconClass = this._weather.getIconStyle(icon);
            this.temperature = data['main']['temp'];
            this.tempMax = data['main']['temp_max'];
            this.tempMin = data['main']['temp_min'];
        });
    }
    
}
