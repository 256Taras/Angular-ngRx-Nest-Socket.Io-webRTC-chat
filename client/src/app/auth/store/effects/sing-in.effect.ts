import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  SendSmsToUserAction,
  SignInFailureAction,
  SmsConfirmed,
  SmsEndowedFromUserAction,
} from '../action/sign-in.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import {AuthService} from "../../services/auth.service";
import {StorageService} from "../../services/storage.service";
import {Router} from "@angular/router";
import { BackEndErrorAction, CheckUserCodeAction } from '../action/sign-up.action';
import { of } from 'rxjs';
import { SingUpRequestInterface } from '../../interfaces/sing-up-request.interface';


@Injectable()
export class SingInEffect {
  sendSmsToUserPhone$ = createEffect(() => this.actions$.pipe(
    ofType(SendSmsToUserAction),
    switchMap(({phone}) => {
      return this.authService.sendSmsToUserPhone(phone).pipe(
        map(({smsEndowed}) => {
          return SmsEndowedFromUserAction({smsEndowed})
        }),
        catchError((res) => of(SignInFailureAction({ backendErrors: res }))),
      )
    })
  ))

  checkUserCode = createEffect(() => this.actions$.pipe(
    ofType(CheckUserCodeAction),
    switchMap(({code,phone}) => {
      return this.authService.checkUserCode(code,phone).pipe(
        map(({jwt,user}:SingUpRequestInterface) => {
          this.storageService.set('user', user);
          this.storageService.set('token', jwt);
          console.log(user);
          return SmsConfirmed({user})
        }),
        catchError((res) => of(SignInFailureAction({ backendErrors: res }))),
      )
    })
  ))

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly storageService: StorageService,
    private router: Router
  ) {
  }
}
