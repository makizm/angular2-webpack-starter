import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorComponent } from './error.component';
import { ErrorService } from './error.service';

console.log('`Error` bundle loaded asynchronously');

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    ErrorComponent,
    
  ],
  imports: [
    CommonModule,
  ],
  providers: [
    ErrorService
  ]
})
export class ErrorModule {}
