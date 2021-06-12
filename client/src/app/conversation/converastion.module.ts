import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationComponent } from './components/conversation/conversation.component';



@NgModule({
  declarations: [ConversationComponent],
  exports: [
    ConversationComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class ConversationModule { }
