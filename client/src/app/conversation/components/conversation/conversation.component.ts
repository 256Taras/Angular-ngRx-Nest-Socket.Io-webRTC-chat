import { Component, Input, OnInit } from '@angular/core';
import { ConversationStateInterface } from '../../../chat/models/interfaces/conversation-state.interface';

@Component({
  selector: 'am-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
})
export class ConversationComponent implements OnInit {
  public img: string = 'https://prusamedica.ru/images/usersq.webp';

  @Input('conversation')
  public conversationProps: ConversationStateInterface;

  public friendAvatar:string
  public friendName:string

  constructor() {
  }

 public ngOnInit(): void {
    this.initValue()
  }

  private initValue():void {
    this.friendAvatar = this.conversationProps.users.map(u=>u.avatar)[0];
    this.friendName = this.conversationProps.users.map(u=>u.firstname)[0];
    console.log('f',this.conversationProps);

  }
}
