import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

const WEATHER_BASE_URI = 'https://api.openweathermap.org/data/2.5';
const WEATHER_APPID = 'ff0d2f4770db74d57f60f3fbe9e53f9d';
const WEATHER_TEMP_UNITS = 'imperial';  // imperial, metric, deault kelvin

@Injectable()

export class mWeatherProvider {

    private _city: string;

    constructor(private _http: Http) {}

    public set city(cityname) {
        this._city = cityname;
    }

    public get city() {
        return this._city;
    }

    public getByCity(city: string = this._city) {
        return this._http.get(WEATHER_BASE_URI + `/weather?q=${city}
            &units=${WEATHER_TEMP_UNITS}&APPID=${WEATHER_APPID}`)
            // .map((res: Response) => res.json());
            //.toPromise()
            .map(this._extractData)
    }

    public test(city:string = this._city): Observable<any> {
        //var headers = new Headers();
        //headers.append('Content-Type', 'application/json; charset=utf-8');
        return this._http.get(WEATHER_BASE_URI + `/weather?q=${city}
            &units=${WEATHER_TEMP_UNITS}&APPID=${WEATHER_APPID}`);
    }

    private _extractData(res: Response) {
        let body = res.json();

        // Determine icon style
        let icon;

        // Icon style definitions
        switch(body.weather[0].icon) {
            case '01d':     // Day: clear sky
                icon = 'mif-sun'; break;
            case '01n':     // Night: clear sky
                icon = 'mif-moon'; break;
            case '04d':     // Day: broken clouds
                icon = 'mif-cloudy2'; break;
            case '02d':     // Day: few clouds
                icon = 'mif-cloudy'; break;
            case '02n':     // Night: few clouds
                icon = 'mif-cloudy'; break;
            case '03d':     // Day: scattered clouds
                icon = 'mif-cloud3'; break;
            case '09d':     // Day: shower rain
                icon = 'mif-weather4'; break;
            case '10d':     // Day: rain
                icon = 'mif-rainy'; break;
            case '11d':     // Day: thunderstorm
                icon = 'mif-lightning2'; break;
            case '13d':     // Day: snow
                icon = 'mif-snowy3'; break;
            case '50d':     // Day: mist
                icon = 'mif-lines'; break;
            default:
                icon = 'mif-none';
        }

        // Set icon style accordingly
        body.weather[0].icon = icon;

        return body || {};
    }

    public getIconStyle(icon: string = 'none') {
        let style = [
            { icon: '01d', class: 'mif-sun' },          // Day: clear sky
            { icon: '01n', class: 'mif-moon' },         // Night: clear sky
            { icon: '04d', class: 'mif-cloudy2' },      // Day: broken clouds
            { icon: '04n', class: 'mif-cloudy2' },      // Day: broken clouds
            { icon: '02d', class: 'mif-cloudy' },       // Day: few clouds
            { icon: '02n', class: 'mif-cloudy' },       // Night: few clouds
            { icon: '03d', class: 'mif-cloud3' },       // Day: scattered clouds
            { icon: '03n', class: 'mif-cloud3' },       // Day: scattered clouds
            { icon: '09d', class: 'mif-weather4' },     // Day: shower rain
            { icon: '09n', class: 'mif-weather4' },     // Day: shower rain
            { icon: '10d', class: 'mif-rainy' },        // Day: rain
            { icon: '10n', class: 'mif-rainy' },        // Day: rain
            { icon: '11d', class: 'mif-lightning2'},    // Day: thunderstorm
            { icon: '11n', class: 'mif-lightning2'},    // Day: thunderstorm
            { icon: '13d', class: 'mif-snowy3' },       // Day: snow
            { icon: '13n', class: 'mif-snowy3' },       // Day: snow
            { icon: '50d', class: 'mif-lines' },        // Day: mist
            { icon: '50n', class: 'mif-lines' },        // Day: mist
            { icon: 'none', class: 'mif-none' }
        ]
        let c = style.filter(item => item.icon === icon);
        return (c.length == 1) ? c[0]['class'] : 'mif-none';
    }
}
