import { SingUpStateInterface } from 'src/app/auth/store/reducers/sing-up.reducer';
import { StepStateInterface } from 'src/app/auth/store/reducers/step.reducer';
import { ChatStateInterface } from 'src/app/chat/models/interfaces/chat-state.interface';

export interface AppStateInterface {
  singUp: SingUpStateInterface;
  singIn: any;
  step: StepStateInterface;
  chat: ChatStateInterface;
}
