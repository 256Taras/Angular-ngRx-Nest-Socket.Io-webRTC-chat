import { ConversationStateInterface } from './../../models/interfaces/conversation-state.interface';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ChatService {
  constructor(
    private readonly http: HttpClient,
    @Inject('BASE-URL') private readonly baseUrl: string
  ) {}

  public getUserConversation(): Observable<ConversationStateInterface> {
    return this.http.get<ConversationStateInterface>(`${this.baseUrl}/conversation`)
  }
}
