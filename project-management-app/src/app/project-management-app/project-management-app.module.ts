import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorNotFoundComponent } from './pages/error-not-found/error-not-found.component';
import { GreetingComponent } from './pages/greeting/greeting.component';
import {TranslateModule} from "@ngx-translate/core";
import { MainRouteComponent } from './pages/main-route/main-route.component';

@NgModule({
  declarations: [
    ErrorNotFoundComponent,
    GreetingComponent,
    MainRouteComponent
  ],
    imports: [
        CommonModule,
        TranslateModule,
    ],
  exports: [
    ErrorNotFoundComponent,
    GreetingComponent,
    MainRouteComponent
  ]
})
export class ProjectManagementAppModule { }
