import { Injectable } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SimpleDialogComponent } from './dialogs';


@Injectable()
export class mDialogComponent {

    private _width = '400px'
    private _height = '250px'

    constructor(private _dialog: MatDialog) {}

    /**
     * Set dialog window width in pixels
     */
    public set width(pixels: number) {
        this._width = pixels + 'px'
    }

    /**
     * Set dialog window height in pixels
     */
    public set height(pixels: number) {
        this._height = pixels + 'px'
    }

    showDialog(message = '') {
        let dialogRef = this._dialog.open(SimpleDialogComponent, {
            width: '400px', height: '250px',
            data: { msg: message }
        })

        dialogRef.afterClosed().subscribe(res => {
            console.log('Error dialog was closed')
            console.log(res)
        })

    }

}
