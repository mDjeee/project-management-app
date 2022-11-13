import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/pages/auth.component';
import { GreetingComponent } from './project-management-app/pages/greeting/greeting.component';

const routes: Routes = [
  { path: '', component: GreetingComponent },
  { path: 'login', component: AuthComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
