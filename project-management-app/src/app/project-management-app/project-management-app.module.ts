import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorNotFoundComponent } from './pages/error-not-found/error-not-found.component';



@NgModule({
  declarations: [
    ErrorNotFoundComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorNotFoundComponent,
  ]
})
export class ProjectManagementAppModule { }
