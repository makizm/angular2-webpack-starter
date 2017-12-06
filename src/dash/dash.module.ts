import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { HttpModule } from '@angular/http';

import { CookieService } from 'ngx-cookie-service';

/**
 * Angular Material
 */
import "!style-loader!css-loader!@angular/material/prebuilt-themes/indigo-pink.css";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';

import { routes } from './dash.routes';
import { DashComponent } from './dash.component';
import { ErrorModule } from './+error';
import { LoginComponent } from './+login';
import { BaThemePreloader, BaThemeSpinner, SmartApp } from './services';

import '../styles/styles.scss';
import '../styles/headings.css';
import '../styles/preloader.scss';
import '../styles/charm.scss';

/**
 * Metro-UI
 */
import * as $ from 'jquery';
import 'metro-ui/build/js/metro.min.js';
import '!style-loader!css-loader!metro-ui/build/css/metro.min.css';
import '!style-loader!css-loader!metro-ui/build/css/metro-schemes.min.css';
import '!style-loader!css-loader!metro-ui/build/css/metro-rtl.min.css';
import '!style-loader!css-loader!metro-ui/build/css/metro-responsive.min.css';
import '!style-loader!css-loader!metro-ui/build/css/metro-icons.min.css';

console.log('`Dash` bundle loaded asynchronously');

const NGA_COMPONENTS = [
  DashComponent,
  LoginComponent
]

const NGA_SERVICES = [
  BaThemePreloader,
  BaThemeSpinner,
  SmartApp
]

const NGA_IMPORTS = [
  CommonModule,
  BrowserModule,
  FormsModule,
  HttpModule,
  BrowserAnimationsModule,
  MatDialogModule,
  ErrorModule,
  // mDialogModule
]

@NgModule({
  bootstrap: [ DashComponent ],
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    ...NGA_COMPONENTS,
  ],
  imports: [
    ...NGA_IMPORTS,
    RouterModule.forRoot(routes, {
      // enableTracing: true,  // < == uncomment for debugging
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
  ],
  exports: [
    // MatDialogModule
  ],
  providers: [
    ...NGA_SERVICES,
    CookieService
  ]
})
export class DashModule {

}
