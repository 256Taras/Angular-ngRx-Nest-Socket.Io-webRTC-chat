import {createAction, props} from "@ngrx/store";
import {SingUpTypes} from '../types/sing-up.types';
import {UserInterface} from "../../../shared/interfaces/user.interface";



export const AddUserInitialsAction = createAction(
  SingUpTypes.ADD_USER_INITIALS,
  props<{ user: UserInterface }>()
);

export const AddUserPhoneAction = createAction(
  SingUpTypes.ADD_USER_PHONE,
  props<{ phone: string }>()
);

export const SendUserPhoneAction = createAction(
  SingUpTypes.SEND_USER_PHONE,
  props<{ phone: string }>()
);

export const AddUserAvatarAction = createAction(
  SingUpTypes.ADD_USER_AVATAR,
  props<{ userAvatar: string  }>()
);



export const SmsEndowedAction = createAction(
  SingUpTypes.SMS_ENDOWED,
  props<{ smsEndowed: boolean }>()
);

export const UserCodeSuccessfulConfirm = createAction(
  SingUpTypes.CODE_SUCCESSFUL_CONFIRM
);

export const CheckUserCodeAction = createAction(
  SingUpTypes.ADD_USER_CODE,
  props<{ code: number,phone:string }>()
);

export const SubmittingAction = createAction(
  SingUpTypes.ADD_USER_CODE,
  props<{ code: number,phone:string }>()
);


export const SignUpAction = createAction(
  SingUpTypes.START,
  props<{ candidate: UserInterface }>()
);



export const BackEndErrorAction = createAction(
  SingUpTypes.BACKEND_ERROR,
  props<{ backendErrors: string }>()
);
