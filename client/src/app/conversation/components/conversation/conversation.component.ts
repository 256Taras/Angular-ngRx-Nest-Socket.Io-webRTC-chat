import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'am-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  public img: string = 'https://prusamedica.ru/images/usersq.webp'

  constructor() { }

  ngOnInit(): void {
  }

}
