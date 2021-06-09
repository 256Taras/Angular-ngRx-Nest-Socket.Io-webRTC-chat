import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from './shared/shared.module';
import { ChatModule } from './chat/chat.module';
import { TopBarModule } from './top-bar/top-bar.module';
import { ConversationModule } from './conversation/converastion.module';
import { AuthInterceptor } from './shared/services/auth-interceptor/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


const DTconfig = {
  maxAge: 25, // Retains last 25 states
  logOnly: environment.production, // Restrict extension to log-only mode
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(DTconfig),


    AuthModule,
    SharedModule,
    ChatModule,
    TopBarModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
