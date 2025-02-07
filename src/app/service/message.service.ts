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
  messages: Map<number, BehaviorSubject<CursorPagingView<Message>>> = new Map()

  constructor(private httpClient: HttpClient) {
  }

  fetchConversationMessages(convId: number | null, nextCursor = '') {
    if (convId) {
      this.httpClient.get<CursorPagingResponseDTO<Message>>(`/api/v1/messages/${convId}`, {
        params: {limit: 5, nextCursor}
      }).subscribe(value => {
        const messageSubject = this.getMessageSubject(convId)

        let newMap = new Map(messageSubject.value.data)
        value.data.forEach(v => newMap.set(v.id, v))

        messageSubject.next({
          data: newMap,
          nextCursor: value.nextCursor
        })
      })
    }
  }

  getCurrentConversationMessagesObservable(convId: number): Observable<CursorPagingView<Message>> {
    if (!convId) return EMPTY
    let messageSubject = this.getMessageSubject(convId)
    return messageSubject.asObservable()
  }


  private getMessageSubject(convId: number): BehaviorSubject<CursorPagingView<Message>> {
    let messageSubject = this.messages.get(convId)
    if (!messageSubject) {
      messageSubject = new BehaviorSubject<CursorPagingView<Message>>({
        data: new Map(),
        nextCursor: ''
      })
      this.messages.set(convId, messageSubject)
    }
    return messageSubject
  }

  sendMessage(convId: number, content: string) {
    return this.httpClient.post('/api/v1/messages', {
      convId, content
    })
  }
}
