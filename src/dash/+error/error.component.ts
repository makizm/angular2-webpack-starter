import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ErrorService } from './error.service';
// import { mDialogComponent } from '../components';

@Component({
    selector: 'error',
    template: ``,
    // providers: [mDialogComponent]
})

export class ErrorComponent implements OnInit {

    public id:number = 0;
    public message = '';
    public returnUrl = '';

    constructor(private _route: ActivatedRoute,
                private _error: ErrorService,
                private _location: Location,
                private _router: Router,
                // private _dialog: mDialogComponent
            ) {}

    ngOnInit() {

        // Get error id from URL
        if (this._route.snapshot.params.id) {
            // from parameter
            this.id = this._route.snapshot.params.id;
            console.log('Got error: ' + this.id + ' ' + this.message)
            // this._dialog.showDialog('Blah blah blah')
        }

        // // Get return url
        // if (this._route.snapshot.params.url) {
        //     this.returnUrl = this._route.snapshot.params.url;
        // } else {
        //     // Check for error url definition
        //     this.returnUrl = this._error.getUrl(this.id);
        // }

        // // Check for error id definition
        // this.message = this._error.getMessage(this.id);
    }

    ngAfterViewInit() {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        // this._dialog.showDialog('Blah blah blah')
    }
}
