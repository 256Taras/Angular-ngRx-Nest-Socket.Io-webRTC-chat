import { Action, createReducer, on } from '@ngrx/store';

import { chatEntity } from '../../models/entity/chat.entity';
import { ChatStateInterface } from '../../models/interfaces/chat-state.interface';
import {
  GetConversationSuccessAction,
  GetConversationAction,
  FeitlureConversationAction,
} from './actions';

const clone = (obj)=>{
  return JSON.parse(JSON.stringify(obj))
}

const steps = createReducer(
  chatEntity,
  on(
    GetConversationAction,
    (state): ChatStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    GetConversationSuccessAction,
    (state, { conversations }): ChatStateInterface => ({
      ...clone(state),
      conversations
    })
  ),
  on(
    FeitlureConversationAction,
    (state, { errors }): ChatStateInterface => ({
      ...state,
      isLoading: false,
      errors,
    })
  )
);

export function chatReducer(state: ChatStateInterface, action: Action) {
  return steps(state, action);
}
