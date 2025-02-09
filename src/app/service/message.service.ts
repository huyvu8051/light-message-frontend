import {Injectable} from '@angular/core'
import {BehaviorSubject, combineLatest, EMPTY, map, Observable, switchMap} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {CursorPagingResponseDTO, CursorPagingView} from '../models/CursorPage'

export interface Message {
  id: number;
  content: string;
  senderId: number;
  sendAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient) {
  }

  fetchConversationMessages(convId: number | null, nextCursor = '') {
    return this.httpClient.get<CursorPagingResponseDTO<Message>>(`/api/v1/messages/${convId}`, {
      params: {limit: 5, nextCursor}
    })
  }
  sendMessage(convId: number, content: string) {
    return this.httpClient.post('/api/v1/messages', {
      convId, content
    })
  }
}
