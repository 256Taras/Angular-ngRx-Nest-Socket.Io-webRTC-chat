import {createAction, props} from "@ngrx/store";
import {UserInterface} from "../../../shared/interfaces/user.interface";
import {SingInTypes} from "../types/sing-in.types";

export const AuthSuccessAction = createAction(
  SingInTypes.SUCCESS,
  props<{ user: UserInterface }>()
);
