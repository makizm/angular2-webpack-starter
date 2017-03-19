import { Routes } from '@angular/router';

import { DashComponent } from './dash';
import { NoContentComponent } from './no-content';
import { AuthComponent } from './+auth';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: DashComponent },
  { path: 'auth', component: AuthComponent },
  { path: '**',    component: NoContentComponent },
];
