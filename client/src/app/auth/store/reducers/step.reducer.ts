import {Action, createReducer, on} from '@ngrx/store';

import {ClearStepStatus, NextStepAction, PrevStepAction} from "../action/step.action";
import {BackEndErrorAction} from "../action/sign-up.action";
import {SingUpStateInterface} from "./sing-up.reducer";

export interface StepStateInterface {
  prev: boolean;
  next: boolean;

}


const initialState: StepStateInterface = {
  prev: false,
  next: false,
}


const steps = createReducer(
  initialState,
  on(
    NextStepAction,
    (state,action): StepStateInterface =>({
      ...state,
      prev:false,
      next: true,

    })
  ),
  on(
    PrevStepAction,
    (state,action): StepStateInterface => ({
      ...state,
      prev:true,
      next: false,

    })
  ), on(
    ClearStepStatus,
    (state,action): StepStateInterface => ({
      ...state,
      prev:false,
      next: false,
    })
  ),
  on(
    BackEndErrorAction,
    (state,action ): StepStateInterface => ({
      ...state,
      prev:true

    })
  )
)


export function stepReducer(state: StepStateInterface, action: Action) {
  return steps(state, action);
}

