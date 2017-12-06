import { DashComponent } from './dash.component';
import { ErrorComponent } from './+error';
import { LoginComponent } from './+login';
import { GridModule } from './+grid';

export const routes = [
  { path: '', children: [
    { path: '', redirectTo: 'grid', pathMatch: 'full' },
    { path: 'grid', loadChildren: 'dash/+grid/grid.module#GridModule' },
    { path: 'login', component: LoginComponent },
    // { path: 'error', component: ErrorComponent },
    // { path: 'error/:id', component: ErrorComponent },
    // { path: '**', redirectTo: '/error/404' }
  ]},
];
