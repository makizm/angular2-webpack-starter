import { NgModule, ModuleWithProviders }      from '@angular/core';

/*
 * Other imports to make available globally
 */
import { CommonModule }  from '@angular/common';
import { CookieService } from 'angular2-cookie/core';

/*
 * Components
 */
import { 
    mClockComponent
} from './components';

/*
 * Services
 */
import {
    BaThemePreloader,
    BaThemeSpinner,
    SmartApp,
 } from './services';

const NGA_COMPONENTS = [
    mClockComponent
]

const NGA_SERVICES = [
    CookieService,
    BaThemePreloader,
    BaThemeSpinner,
    SmartApp
]

@NgModule({
    declarations: [
        ...NGA_COMPONENTS
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ...NGA_COMPONENTS
    ]
})

export class NgaModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders> {
            ngModule: NgaModule,
            providers: [
                ...NGA_SERVICES
            ],
        }
    }  
}