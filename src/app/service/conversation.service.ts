import {Injectable} from '@angular/core'
import {BehaviorSubject, combineLatest, EMPTY, filter, map, Observable, switchMap, tap} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {Message} from './message.service'
import {append, CursorPagingResponseDTO, CursorPagingView} from '../models/CursorPage'

export interface Conversation {
  id: number;
  name: string;
  message: Message;
  textbox: string
}

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private conversations = new BehaviorSubject<CursorPagingView<Conversation>>(this.getDefault())
  conversations$ = this.conversations.asObservable()

  private currConv = new BehaviorSubject<Conversation | null>(null)
  currConv$ = this.currConv.asObservable()

  private currConvId = new BehaviorSubject<number | null>(null)
  private currConvId$ = this.currConvId.asObservable()


  constructor(private httpClient: HttpClient) {
    combineLatest([this.conversations$, this.currConvId$])
      .pipe(
        tap(([conversations, convId]) => {
          if (!convId) return
          const conv = conversations.data.get(convId) ?? null
          this.currConv.next(conv)
        })
      ).subscribe()

  }

  setCurrentConversation(id: number | null) {
    this.currConvId.next(id)
  }

  fetchConversations(nextCursor: string = '') {
    return this.httpClient.get<CursorPagingResponseDTO<Conversation>>(`/api/v1/conversations`, {
      params: {
        limit: 7,
        nextCursor
      }
    }).pipe(
      tap(resp => {
        const value = append(this.conversations.value, resp)
        return this.conversations.next(value)
      })
    )
  }

  getDefault(): CursorPagingView<Conversation> {
    return {
      data: new Map,
      nextCursor: ''
    }
  }


}
