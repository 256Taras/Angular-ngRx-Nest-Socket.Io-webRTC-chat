import { Component, OnInit } from '@angular/core';
import { NextStepAction } from '../../../../store/action/step.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'am-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {

  public angular: string = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png';
  public nest: string = 'https://habrastorage.org/getpro/habr/post_images/d11/98b/ac8/d1198bac8e4ced0d89d5e5983061f418.png';
  public ngRx: string = 'https://ngrx.io/assets/images/badge.svg';
  public rxJS: string = 'https://gblobscdn.gitbook.com/spaces%2F-LwY_OXUQHvmdEoy0xNa%2Favatar.png?alt=media';
  public postgreSQL: string = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png';
  public typeOrm: string = 'https://avatars.githubusercontent.com/u/20165699?s=200&v=4';
  public webRTC: string = 'https://indetics.com/wp-content/uploads/2017/05/webrtc-logo-vert-retro-255x305.png';

  constructor( private store: Store) {
  }

  public ngOnInit(): void {
    setTimeout(()=>{
      this.nextStep()
    },1300)
  }


  private nextStep() {
    this.store.dispatch(NextStepAction());
  }
}
