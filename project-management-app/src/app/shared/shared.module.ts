import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { UiMaterialModule } from '../uiMaterial/ui-material.module';
import { DialogComponent } from './components/dialog/dialog.component';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    UiMaterialModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    UiMaterialModule,
    DialogComponent,
  ]
})
export class SharedModule { }
