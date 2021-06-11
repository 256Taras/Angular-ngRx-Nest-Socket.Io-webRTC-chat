import {createAction, props} from "@ngrx/store";
import {CandidateInterface} from "../../interfaces/candidate.interface";
import {SingInTypes} from "../types/sing-in.types";

export const AuthSuccessAction = createAction(
  SingInTypes.SUCCESS,
  props<{ user: CandidateInterface }>()
);
