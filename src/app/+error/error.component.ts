import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ErrorService } from './error.service';

@Component({
    selector: 'error',
    templateUrl: './error.html',
    styleUrls: ['error.scss'],
    providers: [ ErrorService ]
})

export class ErrorComponent implements OnInit {

    public id:number = 0;
    public message:string;
    public returnUrl:string;

    constructor(private _route: ActivatedRoute,
                private _error: ErrorService,
                private _location: Location,
                private _router: Router) {}

    ngOnInit() {

        // Get error id
        if (this._route.snapshot.params.id) {
            // from parameter
            this.id = this._route.snapshot.params.id;
        }

        // Get return url
        if (this._route.snapshot.params.url) {
            this.returnUrl = this._route.snapshot.params.url;
        } else {
            // Check for error url definition
            this.returnUrl = this._error.getUrl(this.id);
        }

        // Check for error id definition
        this.message = this._error.getMessage(this.id);
    }

    goBack() {
        // redirect to supplied url otherwise go back
        this.returnUrl
            ? this._router.navigateByUrl(this.returnUrl)
            : this._location.back();
    }

}