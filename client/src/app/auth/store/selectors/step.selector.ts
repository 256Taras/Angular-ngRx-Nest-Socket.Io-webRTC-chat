import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppStateInterface} from "../../../shared/interfaces/app-state.interface";
import {StepStateInterface} from '../reducers/step.reducer';


export const NextStepFeatureSelector = createFeatureSelector<AppStateInterface, StepStateInterface>('step')
export const NextStepSelector = createSelector(
  NextStepFeatureSelector,
  (state: StepStateInterface) => state.next
)

export const PrevStepFeatureSelector = createFeatureSelector<AppStateInterface, StepStateInterface>('step')
export const PrevStepSelector = createSelector(
  PrevStepFeatureSelector,
  (state: StepStateInterface) => state.prev
)
