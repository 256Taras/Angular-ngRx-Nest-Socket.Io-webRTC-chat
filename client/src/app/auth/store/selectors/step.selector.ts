import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppStateInterface} from "../../../shared/interfaces/app-state.interface";
import {StepStateInterface} from '../reducers/step.reducer';


export const StepFeatureSelector = createFeatureSelector<AppStateInterface, StepStateInterface>('step')


export const NextStepSelector = createSelector(
  StepFeatureSelector,
  (state: StepStateInterface) => state.next
)

export const PrevStepSelector = createSelector(
  StepFeatureSelector,
  (state: StepStateInterface) => state.prev
)
