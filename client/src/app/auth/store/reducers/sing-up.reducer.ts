import {Action, createReducer, on} from '@ngrx/store';
import {
  AddUserCodeAction,
  AddUserInitialsAction,
  AddUserPhoneAction,
  SignUpAction
} from "../action-creators/sign-up.action";
import {UserInterface} from "../../../shared/interfaces/user.interface";


export interface ISingUpState {
  user: UserInterface;
  isSubmitting: boolean;
}

const initialState: ISingUpState = {
  user: {
    firstname: null,
    lastname: null,
    phone: null,
    code: null ,
    avatar: null,
    avatarColor: null,
  },
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
  ),
  on(
    AddUserInitialsAction,
    (state, {user}): ISingUpState => ({
      ...state,
      user: {
        ...state.user,
        firstname: user.firstname,
        lastname: user.lastname,
        // phone: state.user.phone,
        // code: state.user.code,
        // avatar: state.user.avatar,
        // avatarColor: state.user.avatarColor,
      }
    })
  ),
  on(
    AddUserPhoneAction,
    (state, {phone}): ISingUpState => ({
      ...state,
      user: {
        ...state.user,
         phone
      }
    })
  ),
  on(
    AddUserCodeAction,
    (state, {code}): ISingUpState => ({
      ...state,
      user: {
        ...state.user,
         code,
      }
    })
  )
)


export function signUpReducer(state: ISingUpState, action: Action) {
  return signUp(state, action);
}

