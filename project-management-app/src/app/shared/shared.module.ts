import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { UiMaterialModule } from '../uiMaterial/ui-material.module';
import { DialogComponent } from './components/dialog/dialog.component';
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    DialogComponent,
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
    DialogComponent,
  ]
})
export class SharedModule { }
