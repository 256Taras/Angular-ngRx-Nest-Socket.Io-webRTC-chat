import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import {SignUpComponent} from 'src/app/auth/components/sign-up/sign-up.component';
import {SingInComponent} from 'src/app/auth/components/sing-in/sing-in.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {signUpReducer} from "./store/reducers/sing-up.reducer";
import {signInReducer} from './store/reducers/sign-in.reducer';
import {EffectsModule} from "@ngrx/effects";
import {SingUpEffect} from "./store/effects/sing-up.effect";
import { StepComponent } from './components/sign-up/steps/step.component';
import { EnterPhoneComponent } from './components/sign-up/steps/enter-phone/enter-phone.component';
import { EnterNameComponent } from './components/sign-up/steps/enter-name/enter-name.component';
import { ChooseAvatarComponent } from './components/sign-up/steps/choose-avatar/choose-avatar.component';
import { EnterCodeComponent } from './components/sign-up/steps/enter-code/enter-code.component';
import {stepReducer} from "./store/reducers/step.reducer";
import {StepContainerComponent} from "./components/sign-up/step-container/step-container.component";
import {ErrorMessagesModule} from "../shared/modules/error-messages/error-messages.module";
import {AuthService} from "./services/auth.service";
import {StorageService} from "./services/storage.service";
import {userReducer} from "./store/reducers/user.reducer";




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
  declarations: [
    SignUpComponent,
    SingInComponent,
    StepComponent,
    EnterPhoneComponent,
    EnterNameComponent,
    ChooseAvatarComponent,
    StepContainerComponent,
    EnterCodeComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        StoreModule.forFeature('singIn', signInReducer),
        StoreModule.forFeature('singUp', signUpReducer),
        StoreModule.forFeature('step', stepReducer),
        StoreModule.forFeature('authUser', userReducer),
        EffectsModule.forFeature([SingUpEffect]),
        ErrorMessagesModule,
        FormsModule

    ],
  providers:[
    AuthService,
    StorageService
  ]
})
export class AuthModule {
}
