import {Action, createReducer, on} from '@ngrx/store';
import { SignInAction } from '../action-creators/sign-in.action';
import {SignUpAction} from "../action-creators/sign-up.action";


export interface SingUpStateInterface {
  email: null | string;
  password: null | string;
  isSubmitting: boolean;
}

const initialState: SingUpStateInterface = {
  email: null,
  password: null,
  isSubmitting: false
}


const signIn = createReducer(
  initialState,
  on(
    SignInAction,
    (state): SingUpStateInterface => ({
      ...state,
      isSubmitting: true
    })
  )
)


export function signInReducer(state: SingUpStateInterface, action: Action) {
  return signIn(state, action);
}

