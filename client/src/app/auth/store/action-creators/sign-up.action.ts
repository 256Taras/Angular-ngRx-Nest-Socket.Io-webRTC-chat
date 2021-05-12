import {createAction, props} from "@ngrx/store";
import { SingUpTypes } from '../types/sing-up.types';
import {UserInterface} from "../../../shared/interfaces/user.interface";



export const AddUserInitialsAction = createAction(
  SingUpTypes.ADD_USER_INITIALS,
  props<{user:UserInterface}>()
);

export const AddUserPhoneAction = createAction(
  SingUpTypes.ADD_USER_PHONE,
  props<{phone:number}>()
);

export const AddUserCodeAction = createAction(
  SingUpTypes.ADD_USER_CODE,
  props<{code:number}>()
);


export const SignUpAction = createAction(
  SingUpTypes.START,
  props<{ email: string, password: string }>()
);
export const SignUpSuccessAction = createAction(
  SingUpTypes.SUCCESS,
  props<{ email: string }>()
);
export const SignUpFailureAction = createAction(
  SingUpTypes.FAILURE
);
