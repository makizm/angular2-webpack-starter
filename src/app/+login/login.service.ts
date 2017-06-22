import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

// needs to move to local storage or db
const SMARTAPP_ID: string = '865923f9-f22a-45e2-8108-ba95e4336617';
const SMARTAPP_SECRET: string = '3ed2dbcc-86b5-41fc-b642-e29c97c2669b';

// const URL_REDIRECT = window.location.origin + '/#/auth';
const URL_REDIRECT = 'http://www.leychenko.com';

@Injectable()
export class LoginProvider {

    public authUrl:string = '/api/auth';

    constructor() {}
}
