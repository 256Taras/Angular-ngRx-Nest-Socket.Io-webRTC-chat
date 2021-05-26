import { createFeatureSelector, createSelector } from '@ngrx/store';
import {AppStateInterface} from "../../../shared/interfaces/app-state.interface";
import {SingUpStateInterface} from "../reducers/sing-up.reducer";
import {StepStateInterface} from "../reducers/step.reducer";




// export const  SignUpFeatureSelector = createFeatureSelector<AppStateInterface,SingUpStateInterface>('signUp')
//
//
//
// export  const isSubmittingSelector = createSelector(
//   SignUpFeatureSelector,
//   (authState:SingUpStateInterface)=> authState.isSubmitting
// )
// export  const SmsEndowedSelector = createSelector(
//   SignUpFeatureSelector,
//   (authState:SingUpStateInterface)=> authState.smsEndowed
// )



export const SignUpFeatureSelector = createFeatureSelector<AppStateInterface, SingUpStateInterface>('singUp')


export const isSubmittingSelector = createSelector(
  SignUpFeatureSelector,
  (state) => state.isSubmitting
)

export const SmsEndowedSelector = createSelector(
  SignUpFeatureSelector,
  (state) => state.smsEndowed
)

export const UserPhoneSelector = createSelector(
  SignUpFeatureSelector,
  (state) => state.user.phone
)

export const UserInitialSelector = createSelector(
  SignUpFeatureSelector,
  (state) => {
    return {firstname:state.user.firstname, lastname:state.user.lastname}
  }
)
export const BackendErrors = createSelector(
  SignUpFeatureSelector,
  (state) => state.backendErrors
)

export const UserSelector = createSelector(
  SignUpFeatureSelector,
  (state) => state.user
)

