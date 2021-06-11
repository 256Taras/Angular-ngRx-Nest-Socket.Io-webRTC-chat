import {createAction, props} from "@ngrx/store";;
import {SingInTypes} from "../types/sing-in.types";
import { CandidateInterface } from '../../interfaces/candidate.interface';




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
  props<{ user: CandidateInterface }>()
)

export const SignInFailureAction = createAction(
  SingInTypes.FAILURE,
  props<{ backendErrors: string }>()
)



