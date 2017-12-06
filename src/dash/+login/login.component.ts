import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { LoginProvider } from './login.service';

@Component({
    selector: 'login',
    templateUrl: './login.html',
    providers: [ LoginProvider ]
})

export class LoginComponent {

    private authUrl:string;

    constructor(private _login: LoginProvider, 
                private _router: Router)
    {
        this.authUrl = _login.authUrl;
        console.log(window.location.origin);
    }
    
    public onLogin(){
        // this._router.navigateByUrl('localhost:3000/auth');
        window.location.href = '../auth';
    }
}
