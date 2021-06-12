import { createAction, props } from '@ngrx/store';
import { ErrorResponceInterface } from 'src/app/shared/interfaces/error-responce.interface';
import { ConversationStateInterface } from '../../models/interfaces/conversation-state.interface';

import { ChatTypes } from './types';

export const GetConversationAction = createAction(ChatTypes.GET_CONVERSATION);

export const FeitlureConversationAction = createAction(
  ChatTypes.FEILURE_CONVERSATION,
  props<{ errors: ErrorResponceInterface }>()
);
export const GetConversationSuccessAction = createAction(
  ChatTypes.GET_CONVERSATION_SUCCESS,
  props<{ conversations: ConversationStateInterface }>()
);
