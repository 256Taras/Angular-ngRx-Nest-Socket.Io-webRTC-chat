import {createAction, props} from "@ngrx/store";;
import {SingInTypes} from "../types/sing-in.types";
import { UserInterface } from '../../../shared/interfaces/user.interface';




export const SendSmsToUserAction = createAction(
  SingInTypes.SEND_SMS,
  props<{ phone:string }>()
)

export const SmsEndowedFromUserAction = createAction(
  SingInTypes.SMS_ENDOWED,
  props<{ smsEndowed: boolean }>()
)


export const SmsConfirmed = createAction(
  SingInTypes.SUCCESS,
  props<{ user: UserInterface }>()
)

export const SignInFailureAction = createAction(
  SingInTypes.FAILURE,
  props<{ backendErrors: string }>()
)



