import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorNotFoundComponent } from './pages/error-not-found/error-not-found.component';
import { GreetingComponent } from './pages/greeting/greeting.component';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    ErrorNotFoundComponent,
    GreetingComponent,
  ],
    imports: [
        CommonModule,
        TranslateModule,
    ],
  exports: [
    ErrorNotFoundComponent,
    GreetingComponent,
  ]
})
export class ProjectManagementAppModule { }
