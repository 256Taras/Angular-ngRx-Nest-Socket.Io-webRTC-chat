import {CandidateInterface} from "../../interfaces/candidate.interface";
import {Action, createReducer, on} from "@ngrx/store";
import {AuthSuccessAction} from "../action/user.action";

export interface UserStateInterface {
  user: CandidateInterface;
}

const initialState: UserStateInterface = {
  user: {
    nikname: null,
    firstname: null,
    lastname: null,
    phone: null,
    avatar: null,
  },
}

const user = createReducer(initialState,
  on(AuthSuccessAction,
    (state, {user}) => ({
      ...state,
      user
    })
  )
)

export function userReducer(state: UserStateInterface, action: Action) {
  return user(state, action);
}
