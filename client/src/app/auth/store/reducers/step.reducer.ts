import {Action, createReducer, on} from '@ngrx/store';

import {ClearStepStatus, NextStepAction, PrevStepAction} from "../action-creators/step.action";

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
  )
)


export function stepReducer(state: StepStateInterface, action: Action) {
  return steps(state, action);
}

