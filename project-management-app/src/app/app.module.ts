import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing-module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AppComponent } from './app.component';
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import * as fromApp from './store/app.reducer';
import { AuthModule } from './auth/auth.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { authInterceptorProviders } from './auth/services/auth-interceptor.service';
import { AuthEffects } from './auth/store/auth.effects';
import { environment } from 'src/environments/environment';
import {MissingTranslationHandler, TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {MissingTranslationService} from "./localization/localization";
import {HttpLoaderFactory} from "src/app/localization/localization"



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MissingTranslationService },
    }),
    CoreModule,
    SharedModule,
    AuthModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
