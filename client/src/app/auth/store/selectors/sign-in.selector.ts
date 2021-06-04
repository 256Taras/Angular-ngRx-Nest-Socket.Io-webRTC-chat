import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from '../../../shared/interfaces/app-state.interface';
import { SingInStateInterface } from '../reducers/sign-in.reducer';

export const SignInFeatureSelector = createFeatureSelector<AppStateInterface,SingInStateInterface>('singIn')


export const isSubmittingSelector = createSelector(
  SignInFeatureSelector,
  (state) => state.isSubmitting
)

export const UserPhoneSelector = createSelector(
  SignInFeatureSelector,
  (state) => state.phone
)


export const BackendErrorsSelector = createSelector(
  SignInFeatureSelector,
  (state) => state.backendErrors
)


