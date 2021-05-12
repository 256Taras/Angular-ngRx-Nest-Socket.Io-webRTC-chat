import {Action, createReducer, on} from '@ngrx/store';
import { SignInAction } from '../action-creators/sign-in.action';
import {AddUserInitialsAction} from "../action-creators/sign-up.action";



export interface SingUpStateInterface {
  firstname: null | string;
  lastname: null | string;
  isSubmitting: boolean;
}

const initialState: SingUpStateInterface = {
  firstname: null,
  lastname: null,
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
  ),
)


export function signInReducer(state: SingUpStateInterface, action: Action) {
  return signIn(state, action);
}

