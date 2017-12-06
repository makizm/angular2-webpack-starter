
import { NgModule } from '@angular/core';

import { mDialogComponent } from './mDialog.component'
import { SimpleDialogComponent } from './dialogs';

const NGA_DIALOGS = [
    SimpleDialogComponent
]

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    ...NGA_DIALOGS
  ],
  providers: [mDialogComponent],
  entryComponents: [
      ...NGA_DIALOGS
  ]
})
export class mDialogModule {}
