import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ErrorMessagesModule} from "./modules/error-messages/error-messages.module";
import {environment} from "../../environments/environment";
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [],
  imports: [

  ],
  exports:[
    CommonModule,
    ErrorMessagesModule,
    HttpClientModule,
  ],
  providers:[
    {
      provide: 'BASE-URL',
      useValue: environment.baseUrl
    }
  ]
})
export class SharedModule { }
