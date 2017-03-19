import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { OAuthService } from 'angular2-oauth2/oauth-service';

import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

const SMARTAPP_ID: string = '865923f9-f22a-45e2-8108-ba95e4336617';
const SMARTAPP_SECRET: string = '3ed2dbcc-86b5-41fc-b642-e29c97c2669b';
// const URL_REDIRECT = window.location.origin + '/#/auth';
const URL_REDIRECT = 'http://www.leychenko.com';
const URL_STAGE1: string = 'https://graph.api.smartthings.com/oauth/authorize'; // GET
const URL_STAGE2: string = 'https://graph.api.smartthings.com/oauth/token'; // POST

@Injectable()
//  export class AuthWithSmartThings {
    // https://graph.api.smartthings.com/oauth/confirm_access   <--???
    // https://graph.api.smartthings.com/oauth/authorize
    // response_type=code&scope=app
    // redirect_uri=http://www.leychenko.com:88/auth
    // client_id=865923f9-f22a-45e2-8108-ba95e4336617
//  }

export class AuthProvider {

    // protected _oauth: OAuthService;
    public url: string = window.location.origin + '/#/auth';
    public issuer: string = window.location.origin;
    public lastError;

    constructor(private _oauth: OAuthService, private _http: Http) {
        this._oauth.redirectUri = this.url;
        this._oauth.issuer = this.issuer;
        // OAuth2-based access_token
        this._oauth.oidc = true;
        this._oauth.setStorage(sessionStorage);
        // this.oauthService.logoutUrl = "";
        // console.log(this.auth.redirectUri);
    }

    public setOptions(loginurl,clientid,scope) {
        this._oauth.loginUrl = loginurl;
        this._oauth.clientId = clientid;
        this._oauth.scope = scope;
    }

    public tryLogin() {
        this._oauth.tryLogin({
            onTokenReceived: context => {
            //
            // Output just for purpose of demonstration
            // Don't try this at home ... ;-)
            // 
            console.log("logged in");
            console.log(context);
        },
            validationHandler: context => {}
        });
        return "Ta da!";
    }

    /*
    * Auth Step #2
    * 
    * get token to get a token and an endpoint
    * HTTP POST: https://graph.api.smartthings.com/oauth/token
    * HEADERES : Content-Type application/x-www-form-urlencoded
    * POST Data: 
    *   grant_type authorization_code
    *   code <code from Step #1>
    *   client_id <Oauth id of the SmartApp>
    *   client_secret <Oauth secret of the SmartApp>
    *   redirect_uri <Oauth redirect URL to this page>
    * Expected Return:
    *   {"access_token":string ,"token_type":string ,"expires_in":number ,"scope":string }
    */
    public getToken(code) {
        let options = { Headers: new Headers({ 
            'Content-Type': 'application/x-www-form-urlencodaed',
            'Access-Control-Allow-Origin': '*'}) };
        let body = `grant_type=authorization_code&`
                    + `code=${code}&`
                    + `client_id=${SMARTAPP_ID}&`
                    + `client_secret=${SMARTAPP_SECRET}&`
                    + `redirect_uri=${URL_REDIRECT}`;

        return this._http.post(URL_STAGE2, JSON.stringify(body), options)
            .map(res => res.json())
            .subscribe(
                data => this.getData(data),
                err => this._handleError(err),
                () => console.log("Done!")
            );
    }

    private getData(data) {
        if (data) {
            console.log("Got data!!!");
        }
    }

    private _handleError(err) {
        // to do: redirect to error page and display error message
        this.lastError = err;
    }
}
