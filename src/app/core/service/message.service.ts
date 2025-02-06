import {Injectable} from '@angular/core'
import {BehaviorSubject, combineLatest, EMPTY, map, Observable, switchMap} from 'rxjs'
import {HttpClient} from '@angular/common/http'

export interface Message {
  id: number;
  content: string;
  senderId: number;
  sendAt: string;
}

export interface Conversation {
  id: number;
  name: string;
  message: Message;
  textbox: string
}

interface CursorPagingResponseDTO<T> {
  data: T[]
  nextCursor: string
}

export interface CursorPagingView<T> {
  data: Map<number, T>
  nextCursor: string
}


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private conversations = new BehaviorSubject<Conversation[]>([])
  conversations$ = this.conversations.asObservable()

  private currentConversation = new BehaviorSubject<Conversation | null>(null)
  currentConversation$ = this.currentConversation.asObservable()

  private currentConversationId = new BehaviorSubject<number | null>(null)
  currentConversationId$ = this.currentConversationId.asObservable()

  messages: Map<number, BehaviorSubject<CursorPagingView<Message>>> = new Map()

  constructor(private httpClient: HttpClient) {
    httpClient.get(`/api/v1/conversations`).subscribe((value) => {
      this.conversations.next(value as any)
    })


    combineLatest([this.conversations$, this.currentConversationId$])
      .pipe(
        map(([conversations, currConvId]) => {

          if (!currConvId) return null
          return conversations.find((conv) => conv.id === currConvId) || null
        })
      )
      .subscribe((conv) => {
        this.currentConversation.next(conv)
      })


  }

  setCurrentConversationId(id: number | null) {
    this.currentConversationId.next(id)
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

  getCurrentConversationMessagesObservable(): Observable<CursorPagingView<Message>> {
    return this.currentConversation$.pipe(
      switchMap(conv => {
        if (!conv) return EMPTY
        let messageSubject = this.getMessageSubject(conv.id)
        return messageSubject.asObservable()
      })
    )
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
