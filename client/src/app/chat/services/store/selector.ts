import { createFeatureSelector, createSelector } from "@ngrx/store"
import { ChatStateInterface } from "../../models/interfaces/chat-state.interface"
import { AppStateInterface } from '../../../shared/interfaces/app-state.interface';

export const ChatFeatureSelector = createFeatureSelector<AppStateInterface, ChatStateInterface>('chat')


export const ConversationSelector = createSelector(
    ChatFeatureSelector,
  (state: ChatStateInterface) => state.conversations
)


export const isLoadingSelector = createSelector(
    ChatFeatureSelector,
  (state: ChatStateInterface) => state.isLoading
)

export const ErrorChatSelector = createSelector(
    ChatFeatureSelector,
  (state: ChatStateInterface) => state.errors
)
