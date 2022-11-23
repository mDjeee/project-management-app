import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorNotFoundComponent } from './pages/error-not-found/error-not-found.component';
import { GreetingComponent } from './pages/greeting/greeting.component';
import { TranslateModule } from "@ngx-translate/core";
import { MainRouteComponent } from './pages/main-route/main-route.component';
import { UiMaterialModule } from '../uiMaterial/ui-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    ErrorNotFoundComponent,
    GreetingComponent,
    MainRouteComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    UiMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
  exports: [
    ErrorNotFoundComponent,
    GreetingComponent,
    MainRouteComponent,
    NgxSpinnerModule,
  ]
})
export class ProjectManagementAppModule { }
