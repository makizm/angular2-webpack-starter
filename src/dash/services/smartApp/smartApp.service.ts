import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';

import 'rxjs/add/operator/toPromise';

const BASE_URL = window.location.origin + '/api';

@Injectable()
export class SmartApp {
    private cookieName = 'token';

    private url:string;
    private key:string;

    constructor(
                private _cookieService: CookieService,
                private _router: Router,
                private _http: Http) {
    }

    public testGet() {
        return BASE_URL;
    }

    public authCheck() {
        // Check for cookie
        if(!this._cookieService.get(this.cookieName)) {
            // Redirect to login page when no token cookie present
            this._router.navigate(['/error', {id: 201}]);
            console.log('No cookie...')
        } else {
            // Get token cookie and decode it
            let data = atob(this._cookieService.get(this.cookieName));
            // Parse token data into key and url
            [ this.key, this.url ] = data.split(';');
        }
    }

    public getDevices(type): Promise<any>{
        if(type) {
            return this._http.get(BASE_URL + '/' + type)
                .toPromise()
                .then(this.extractData)
                .catch(this.handleError);
        }
    }

    public getDeviceCommands() {
        let url = BASE_URL + '/switches/'
        return this._http.get(BASE_URL + '/')
            .map(res => res.json())
    }

    public toggleSwitch(item) {
        // to do
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: Response | any) {
        let errMsg: string;

        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        
        console.error(errMsg);
        return Promise.reject(errMsg);
    }
}
