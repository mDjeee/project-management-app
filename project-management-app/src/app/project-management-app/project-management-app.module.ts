import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorNotFoundComponent } from './pages/error-not-found/error-not-found.component';
import { GreetingComponent } from './pages/greeting/greeting.component';
import { TranslateModule } from "@ngx-translate/core";
import { MainRouteComponent } from './pages/main-route/main-route.component';
import { UiMaterialModule } from '../uiMaterial/ui-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardComponent } from './pages/board/board.component';
import { RouterModule } from '@angular/router';
import { ClickStopPropagation } from './directives/click-stop-propagation.directive';
import { SortColumnPipe } from './pages/board/store/pipe/sort-column.pipe';

@NgModule({
  declarations: [
    ErrorNotFoundComponent,
    GreetingComponent,
    MainRouteComponent,
    BoardComponent,
    ClickStopPropagation,
    SortColumnPipe,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    UiMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    ErrorNotFoundComponent,
    GreetingComponent,
    MainRouteComponent,
    BoardComponent,
    ClickStopPropagation,
    SortColumnPipe,
  ]
})
export class ProjectManagementAppModule { }
