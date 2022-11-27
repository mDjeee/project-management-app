import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { UiMaterialModule } from '../uiMaterial/ui-material.module';
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from './components/confirmDialog/confirm-dialog.component';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    UiMaterialModule,
    TranslateModule,
    FormsModule,
    RouterModule // ? Для работы routerLink в теге a
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
  ]
})
export class SharedModule { }
