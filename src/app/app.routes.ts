import { Routes } from '@angular/router';
import { DashComponent } from './dash';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: DashComponent },
  { path: '**',    component: NoContentComponent },
];
