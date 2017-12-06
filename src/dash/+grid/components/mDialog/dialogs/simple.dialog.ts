import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'simple-dialog',
    templateUrl: './simple.dialog.html'
})
export class SimpleDialogComponent {
    constructor(public dialogRef: MatDialogRef<SimpleDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {}

    close(): void {
        this.dialogRef.close()
    }

    onNoClick(): void {
        this.close()
    }
}
