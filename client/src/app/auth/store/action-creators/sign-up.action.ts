import {createAction, props} from "@ngrx/store";
import { SingUpTypes } from '../types/sing-up.types';


export const SignUpAction = createAction(
  SingUpTypes.START,
  props<{ email: string, password: string }>()
)
export const SignUpSuccessAction = createAction(
  SingUpTypes.SUCCESS,
  props<{ email: string }>()
)
export const SignUpFailureAction = createAction(
  SingUpTypes.FAILURE
)
