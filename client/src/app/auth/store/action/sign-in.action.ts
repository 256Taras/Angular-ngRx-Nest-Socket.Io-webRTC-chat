import {createAction, props} from "@ngrx/store";;
import {SingInTypes} from "../types/sing-in.types";

export const SignInAction = createAction(
  SingInTypes.START,
  props<{ email: string, password: string }>()
)
