import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorNotFoundComponent } from './pages/error-not-found/error-not-found.component';
import { GreetingComponent } from './pages/greeting/greeting.component';



@NgModule({
  declarations: [
    ErrorNotFoundComponent,
    GreetingComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ErrorNotFoundComponent,
    GreetingComponent,
  ]
})
export class ProjectManagementAppModule { }
