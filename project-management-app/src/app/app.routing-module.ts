import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/pages/auth.component';
import { GreetingComponent } from './project-management-app/pages/greeting/greeting.component';
import {ErrorNotFoundComponent} from "./project-management-app/pages/error-not-found/error-not-found.component";

const routes: Routes = [
  { path: '', component: GreetingComponent },
  { path: 'login', component: AuthComponent },
  { path: '**', component: ErrorNotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
