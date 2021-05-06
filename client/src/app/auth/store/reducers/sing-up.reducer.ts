import {Action, createReducer, on} from '@ngrx/store';
import {SignUpAction} from "../action-creators/sign-up.action";


export interface ISingUpState {
  email: null | string;
  password: null | string;
  isSubmitting: boolean;
}

const initialState: ISingUpState = {
  email: null,
  password: null,
  isSubmitting: false
}


const signUp = createReducer(
  initialState,
  on(
    SignUpAction,
    (state): ISingUpState => ({
      ...state,
      isSubmitting: true
    })
  )
)


export function signUpReducer(state: ISingUpState, action: Action) {
  return signUp(state, action);
}

