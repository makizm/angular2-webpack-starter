import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { ErrorComponent } from './+error';

import { GridComponent } from './grid.component';
import { routing } from './grid.routes';

import {
    mClockComponent,
    mWeatherComponent,
    // mDialogModule,

} from './components';

const NGA_COMPONENTS = [
    GridComponent,
    mClockComponent,
    mWeatherComponent
  ]

const NGA_IMPORTS = [
    routing,
    CommonModule
]

const NGA_PROVIDERS = [
    //ErrorComponent,
]

@NgModule({
    declarations: [
      /**
       * Components / Directives/ Pipes
       */
      ...NGA_COMPONENTS
    ],
    imports: [
      ...NGA_IMPORTS
    ],
    providers: [
        /**
         * Providers / Services
         */
      ...NGA_PROVIDERS
    ]
  })
  export class GridModule {
  
  }
