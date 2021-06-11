
import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { catchError, map, switchMap, tap } from "rxjs/operators"
import { of } from "rxjs"

import { ConversationStateInterface } from "../../models/interfaces/conversation-state.interface"
import { ChatService } from "../api/chat.service"
import { GetConversationAction ,GetConversationSuccessAction,FeitlureConversationAction} from "./actions"


@Injectable()
export class ChatEffect {
    getMyConversation$ = createEffect(() => this.actions$.pipe(
    ofType(GetConversationAction),
    switchMap(()=>{
      return this.chatService.getUserConversation().pipe(
         
        map((conversations:ConversationStateInterface)=>{
          console.log(conversations)
          return GetConversationSuccessAction({conversations})
        }),
        catchError((errors) => of(FeitlureConversationAction({ errors}))), 
        )
      })
    ))

    
  



  constructor(
    private readonly actions$: Actions,
    private readonly chatService:ChatService
  ) {
  }
}
