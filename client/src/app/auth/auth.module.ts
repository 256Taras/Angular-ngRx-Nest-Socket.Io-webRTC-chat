import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import {SignUpComponent} from 'src/app/auth/components/sign-up/sign-up.component';
import {SingInComponent} from 'src/app/auth/components/sing-in/sing-in.component';
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {signUpReducer} from "./store/reducers/sing-up.reducer";
import {signInReducer} from './store/reducers/sign-in.reducer';
import {EffectsModule} from "@ngrx/effects";
import {SingUpEffect} from "./store/effects/sing-up.effect";



const routes: Routes = [
  {
    path: 'sing-in',
    component: SingInComponent
  },
  {
    path: 'sing-up',
    component: SignUpComponent
  },
]

@NgModule({
  declarations: [SignUpComponent, SingInComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('singIn',  signInReducer),
    StoreModule.forFeature('singUp',  signUpReducer),
    EffectsModule.forFeature([SingUpEffect])

  ]
})
export class AuthModule {
}
