import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthModule} from "./auth/auth.module";
import {StoreModule} from "@ngrx/store";
import {ReactiveFormsModule} from "@angular/forms";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {EffectsModule} from "@ngrx/effects";
import { WelcomeComponent } from './client/src/app/auth/components/sign-up/steps/welcome/welcome.component';


const DTconfig = {
  maxAge: 25, // Retains last 25 states
  logOnly: environment.production, // Restrict extension to log-only mode
}

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(DTconfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
