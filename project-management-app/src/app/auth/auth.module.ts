import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './pages/auth.component';
import { UiMaterialModule } from '../uiMaterial/ui-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiMaterialModule,
  ],
  exports: [
    AuthComponent,
  ]
})
export class AuthModule { }
