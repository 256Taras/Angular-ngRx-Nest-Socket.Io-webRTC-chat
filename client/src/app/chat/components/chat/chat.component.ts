import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public items:number[]=[1,2,3,4,5,6,7,8]
  public phone: string='https://www.rawshorts.com/freeicons/wp-content/uploads/2017/01/black_webpict08_1484337066-1.png';
  public camera: string= 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Video_camera_icon.svg/1200px-Video_camera_icon.svg.png';
  public userAvatar:string = 'https://s3.cdn.teleprogramma.pro/wp-content/uploads/2020/01/82397ba86e41e22b722ae68d611cffa3.jpg';
  constructor() { }

  ngOnInit(): void {
  }

}
