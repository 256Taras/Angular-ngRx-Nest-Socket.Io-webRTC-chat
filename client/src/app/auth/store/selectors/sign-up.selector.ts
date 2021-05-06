import { createFeatureSelector, createSelector } from '@ngrx/store';
import {AppStateInterface} from "../../../shared/interfaces/app-state.interface";
import {SingUpStateInterface} from "../reducers/sign-in.reducer";


export const  SignUpFeatureSelector = createFeatureSelector<AppStateInterface,SingUpStateInterface>('signUp')

export  const isSubmittingSelector = createSelector(
  SignUpFeatureSelector,
  (authState:SingUpStateInterface)=> authState.isSubmitting
)
