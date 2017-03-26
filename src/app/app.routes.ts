import { Routes } from '@angular/router';

import { DashComponent } from './dash';
import { NoContentComponent } from './no-content';
import { LoginComponent } from './+login';
import { ErrorComponent } from './+error';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: DashComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'error/:id', component: ErrorComponent },
  { path: 'login', component: LoginComponent },
  { path: '**',    component: NoContentComponent },
];
