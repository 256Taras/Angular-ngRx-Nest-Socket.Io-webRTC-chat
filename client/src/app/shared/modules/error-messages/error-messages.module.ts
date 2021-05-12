import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessagesComponent } from './components/error-messages/error-messages.component';



@NgModule({
  declarations: [ErrorMessagesComponent],
  exports: [
    ErrorMessagesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ErrorMessagesModule { }
