import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'am-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  public faceAvatar: string = 'https://prusamedica.ru/images/usersq.webp';

  @Input('me')
  public meProps:any
  constructor() {
  }

  ngOnInit(): void {

  }

}
