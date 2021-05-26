import {Action, createReducer, on} from '@ngrx/store';
import { SignInAction } from '../action/sign-in.action';
import {AddUserInitialsAction} from "../action/sign-up.action";



export interface SingInStateInterface {
  firstname: null | string;
  lastname: null | string;
  isSubmitting: boolean;
}

const initialState: SingInStateInterface = {
  firstname: null,
  lastname: null,
  isSubmitting: false
}


const signIn = createReducer(
  initialState,
  on(
    SignInAction,
    (state): SingInStateInterface => ({
      ...state,
      isSubmitting: true
    })
  ),
)


export function signInReducer(state: SingInStateInterface, action: Action) {
  return signIn(state, action);
}

