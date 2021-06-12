import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import { RouterModule } from '@angular/router';
import { MessageModule } from '../message/message.module';
import { ConversationModule } from '../conversation/converastion.module';
import { StoreModule } from '@ngrx/store';
import { chatReducer } from './services/store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { ChatService } from './services/api/chat.service';
import { ChatEffect } from './services/store/effect';
import { AuthGuard } from '../shared/guards/auth.guard';



const routes = [
  {
    path:'',
    component:ChatComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('chat', chatReducer),
    EffectsModule.forFeature([ChatEffect]),
    MessageModule,
    ConversationModule,

  ],
  providers:[
    ChatService
  ]
})
export class ChatModule { }
