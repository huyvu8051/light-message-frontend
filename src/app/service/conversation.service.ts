import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Message} from './message.service'
import {CursorPagingResponseDTO, Identifiable} from '../models/CursorPage'

export interface Conversation extends Identifiable{
  id: number;
  name: string;
  message: Message;
  textbox: string
}

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private httpClient: HttpClient) {
  }

  fetchConversations(nextCursor: string = '') {
    return this.httpClient.get<CursorPagingResponseDTO<Conversation>>(`/api/v1/conversations`, {
      params: {
        limit: 7,
        nextCursor
      }
    })
  }

  fetchConversation(convId: number) {
    return this.httpClient.get<Conversation>(`/api/v1/conversations/${convId}`)
  }
}
