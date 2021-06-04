import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  BackEndErrorAction, CheckUserCodeAction, SendUserPhoneAction, SignUpAction,

  SmsEndowedAction, UserCodeSuccessfulConfirm,
} from '../action/sign-up.action';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { NextStepAction } from '../action/step.action';
import { StorageService } from '../../services/storage.service';
import { SingUpRequestInterface } from '../../interfaces/sing-up-request.interface';
import { AuthSuccessAction } from '../action/user.action';
import { Router } from '@angular/router';


@Injectable()
export class SingUpEffect {

  private sendSMS$ = createEffect(() => this.actions$.pipe(
    ofType(SendUserPhoneAction),
    switchMap(({ phone }) => {
      return this.authService.sendSms(phone).pipe(
        map((smsEndowed) => {
          return SmsEndowedAction(smsEndowed);
        }),
        catchError((err) => of(BackEndErrorAction({ backendErrors: err.error.message }))),
      );
    }),
  ));


  private checkCode$ = createEffect(() => this.actions$.pipe(
    ofType(CheckUserCodeAction),
    switchMap(({ code, phone }) => this.authService.CheckCode(code, phone).pipe(
      switchMap(({ confirmed }) => [UserCodeSuccessfulConfirm(), NextStepAction()]),
      catchError((res) => of(BackEndErrorAction({ backendErrors: res }))),
    )),
  ));
  // @ts-ignore
  public singUp$ = createEffect(() => this.actions$.pipe(
    ofType(SignUpAction),
    switchMap(({ candidate }) => {
      console.log('candidate', candidate);
      return this.authService.SingUp(candidate).pipe(
        map(({ user, jwt }: SingUpRequestInterface) => {
          this.storageService.set('user', user);
          this.storageService.set('token', jwt);
          console.log('s', user);
          return AuthSuccessAction({ user });
        }),
        catchError((res) => of(BackEndErrorAction({ backendErrors: res }))),
      );
    }),
  ));

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/');
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly storageService: StorageService,
    private router: Router,
  ) {
  }

}
