import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthProvider } from './auth.service';

interface authToken {
    token: string;
    url: string;
}

@Component({
    selector: 'auth',
    templateUrl: './auth.html',
    providers: [ AuthProvider ]
})

export class AuthComponent implements OnInit {

    public id:string;
    public origin;

    private authCode: string;
    private authKey: string;
    private authToken = new Map;

    constructor(private _login: AuthProvider, 
                private _route: ActivatedRoute) {

        // _login.setOptions(
        //     'https://graph.api.smartthings.com/oauth/authorize',
        //     '865923f9-f22a-45e2-8108-ba95e4336617',
        //     'app'
        // );

        //this.origin = window.location.origin;

        // this.origin = _login.tryLogin();

        //console.log('Window origin: ' + this.origin);
    }

    // Getting URL params
    ngOnInit() {
        // Auth Step #1
        // get auth return code after redirection back from SS
        this.authCode = this._route.snapshot.queryParams["code"];
        console.log("Code: " + this.authCode);
        /*
        * Auth Step #2
        */
        if (this.authCode) {
            this.origin = this._login.getToken(this.authCode);
            console.log("Origin: ");
            console.log(this.origin);
        }

        if (this._login.lastError) {
            this.origin = this._login.lastError;
            console.log(this._login.lastError);
        }

        // Auth Step #3
        // get token and endpoint url for making REST calls
        

        // console.log(this.authToken); 
    }

}
