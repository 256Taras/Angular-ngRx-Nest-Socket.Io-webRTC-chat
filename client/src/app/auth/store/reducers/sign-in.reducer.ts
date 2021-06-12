import { Action, createReducer, on } from '@ngrx/store';
import { SendSmsToUserAction, SmsConfirmed, SmsEndowedFromUserAction } from '../action/sign-in.action';


export interface SingInStateInterface {
  isSubmitting: boolean;
  phone: string | null;
  backendErrors: string | null;
}

const initialState: SingInStateInterface = {
  isSubmitting: false,
  phone: null,
  backendErrors: null
};


const signIn = createReducer(
  initialState,
  on(
    SendSmsToUserAction,
    (state,{phone}): SingInStateInterface => ({
      ...state,
      isSubmitting: true,
      phone
    }),
  ),
  on(
    SmsEndowedFromUserAction,
    (state): SingInStateInterface => ({
      ...state,
      isSubmitting: false,
    }),
  ),
  on(
    SmsConfirmed,
    (state,{user}): SingInStateInterface => ({
      ...state,
      isSubmitting: false,
    }),
  ),
);


export function signInReducer(state: SingInStateInterface, action: Action) {
  return signIn(state, action);
}

