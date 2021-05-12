import {SingUpStateInterface} from "../../auth/store/reducers/sign-in.reducer";
import {StepStateInterface} from "../../auth/store/reducers/step.reducer";

export interface AppStateInterface {
  signUp: SingUpStateInterface,
  signIn: any,
  step:StepStateInterface,
}

