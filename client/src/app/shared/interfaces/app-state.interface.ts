
import {StepStateInterface} from "../../auth/store/reducers/step.reducer";
import {SingUpStateInterface} from "../../auth/store/reducers/sing-up.reducer";

export interface AppStateInterface {
  singUp: SingUpStateInterface,
  singIn: any,
  step:StepStateInterface,
}

