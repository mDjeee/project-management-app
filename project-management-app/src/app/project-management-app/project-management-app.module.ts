import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorNotFoundComponent } from './pages/error-not-found/error-not-found.component';
import { GreetingModule } from './pages/greeting/greeting.component';



@NgModule({
  declarations: [
    ErrorNotFoundComponent,
    GreetingModule,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ErrorNotFoundComponent,
    GreetingModule,
  ]
})
export class ProjectManagementAppModule { }
