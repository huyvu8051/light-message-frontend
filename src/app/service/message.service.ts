import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {CursorPagingResponseDTO} from '../models/CursorPage'

export interface Message {
  id: number;
  content: string;
  senderId: number;
  sendAt: string;
  convId: number
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient) {
  }

  fetchConversationMessages(convId: number | null, nextCursor = '') {
    return this.httpClient.get<CursorPagingResponseDTO<Message>>(`/api/v1/messages/${convId}`, {
      params: {limit: 15, nextCursor}
    })
  }
  sendMessage(convId: number, content: string) {
    return this.httpClient.post('/api/v1/messages', {
      convId, content
    })
  }
}
