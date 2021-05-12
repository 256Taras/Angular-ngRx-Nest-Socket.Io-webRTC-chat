import {createAction, props} from "@ngrx/store";
import {StepTypes} from "../types/step.types";


export const NextStepAction = createAction(
  StepTypes.NEXT,
);
export const PrevStepAction = createAction(
  StepTypes.PREV,
);
export const ClearStepStatus = createAction(
  StepTypes.СLEAR,
);
