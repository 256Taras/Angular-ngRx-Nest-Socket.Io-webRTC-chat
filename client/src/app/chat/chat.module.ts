import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import { RouterModule } from '@angular/router';
import { MessageModule } from '../message/message.module';
import { ConversationModule } from '../conversation/converastion.module';


const routes = [
  {
    path:'',
    component:ChatComponent
  }
]

@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MessageModule,
    ConversationModule
  ]
})
export class ChatModule { }
