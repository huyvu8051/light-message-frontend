import {Injectable} from '@angular/core'
import {BehaviorSubject, combineLatest, EMPTY, filter, map, Observable, switchMap, tap} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {Message} from './message.service'

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
  private conversations = new BehaviorSubject<Conversation[]>([])
  conversations$ = this.conversations.asObservable()

  private currConv = new BehaviorSubject<Conversation | null>(null)
  currConv$ = this.currConv.asObservable()

  private currConvId = new BehaviorSubject<number | null>(null)
  private currConvId$ = this.currConvId.asObservable()


  constructor(private httpClient: HttpClient) {
    combineLatest([this.conversations$, this.currConvId$])
      .pipe(
        tap(([conversations, convId]) => {
          const conv = conversations.find(conv => conv.id === convId) ?? null
          this.currConv.next(conv)
        })
      ).subscribe()

  }

  getConversations() {
    return this.httpClient.get<Conversation[]>(`/api/v1/conversations`).pipe(tap((resp) => {
      this.conversations.next(resp)
    }))
  }


  setCurrentConversation(id: number | null) {
    this.currConvId.next(id)
  }


}
