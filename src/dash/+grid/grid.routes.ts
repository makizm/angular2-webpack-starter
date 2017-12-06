import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { GridComponent } from './grid.component';

export const routes: Routes = [
  {
    path: '',
    component: GridComponent,
    children: [
      //  path: '**', redirectTo: '/error/404'}
    ]},
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
