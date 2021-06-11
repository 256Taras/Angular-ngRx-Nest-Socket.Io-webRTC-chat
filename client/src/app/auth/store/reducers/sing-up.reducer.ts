import {Action, createReducer, on} from '@ngrx/store';
import {
  AddUserAvatarAction,
  AddUserInitialsAction,
  AddUserPhoneAction, BackEndErrorAction, CheckUserCodeAction,
  SignUpAction, SmsEndowedAction, SubmittingAction, UserCodeSuccessfulConfirm
} from "../action/sign-up.action";

import { SmsConfirmed } from '../action/sign-in.action';
import { CandidateInterface } from '../../interfaces/candidate.interface';


export interface SingUpStateInterface {
  user: CandidateInterface;
  isSubmitting: boolean;
  backendErrors: string | null;
  smsEndowed: boolean;
  codeSuccessfulConfirm: boolean;
}

const initialState: SingUpStateInterface = {
  user: {
    id:null,
    nikname: null,
    firstname: null,
    lastname: null,
    phone: null,
    avatar: null,
  },
  codeSuccessfulConfirm: false,
  isSubmitting: false,
  backendErrors: null,
  smsEndowed: false

}


const signUp = createReducer(
  initialState,


  on(
    SignUpAction,
    (state): SingUpStateInterface => ({
      ...state,
      isSubmitting: true
    })
  ),
  on(
    SmsConfirmed,
    (state,{user}): SingUpStateInterface => ({
      ...state,
      user:{
        ...state.user,
        id:user.id,
        nikname:user.nikname,
        lastname:user.lastname,
        firstname:user.firstname,
        avatar:user.avatar,
        phone:user.phone,
        code:user.code,
      }
    }),
  ),
  on(
    AddUserInitialsAction,
    (state, {user}): SingUpStateInterface => ({
      ...state,
      user: {
        ...state.user,
        nikname: user?.nikname ? user.nikname : '',
        firstname: user?.firstname ? user.firstname : '',
        lastname: user?.lastname ? user.lastname : '',

      }
    })
  ),
  on(
    AddUserPhoneAction,
    (state, {phone}): SingUpStateInterface => ({
      ...state,
      isSubmitting: true,
      backendErrors: '',
      user: {
        ...state.user,
        phone
      }
    })
  ),
  on(
    SmsEndowedAction,
    (state, {smsEndowed}): SingUpStateInterface => ({
      ...state,
      smsEndowed,
      isSubmitting: false,
    })
  ),
  on(
    UserCodeSuccessfulConfirm,
    (state): SingUpStateInterface => ({
      ...state,
      codeSuccessfulConfirm: true,
      isSubmitting: false,
    })
  ),
  on(
    AddUserAvatarAction,
    (state, {userAvatar}): SingUpStateInterface => (
      {
        ...state,
        user: {
          ...state.user,
          avatar: userAvatar
        }
      }
    )
  ),
  on(
    SubmittingAction,
    (state): SingUpStateInterface => ({
      ...state,
      isSubmitting: true
    })
  ),
  on(
    BackEndErrorAction,
    (state, {backendErrors}): SingUpStateInterface => ({
      ...state,
      ...state.user,
      isSubmitting: false,
      backendErrors
    })
  )
)


export function signUpReducer(state: SingUpStateInterface, action: Action) {
  return signUp(state, action);
}

