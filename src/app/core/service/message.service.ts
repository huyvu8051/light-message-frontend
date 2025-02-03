import {Injectable} from '@angular/core'
import {BehaviorSubject, combineLatest, map} from 'rxjs'

export interface Message {
  id: number;
  content: string;
  sendAt: string;
}

export interface Conversation {
  id: number;
  name: string;
  message: Message;
  textbox: string
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

  private messages: Map<number, BehaviorSubject<Message[]>> = new Map()


  constructor() {

    // Simulate API fetch with setTimeout
    setTimeout(() => {
      const mockData: Conversation[] = [
        {
          id: 1,
          name: 'Son Tung M-TP',
          message: {id: 4, content: 'Dung lam trai tim anh dau, co chac yeu la day', sendAt: 'Tue'},
          textbox: ''
        },
        {
          id: 2,
          name: 'Hai Tu',
          message: {id: 5, content: 'Vay thi anh xin chet vi nguoi anh thuong', sendAt: '16:22'},
          textbox: ''
        },
        {
          id: 3,
          name: 'Ho Quang Hieu',
          message: {id: 6, content: 'Co biet bao nhieu dieu con dang van vuong', sendAt: 'Mon'},
          textbox: ''
        }
      ]
      this.conversations.next(mockData) // Emit new conversation list
    }, 700)

    // Auto-update `currentConversation` when `conversations` or `selectedConvId` changes
    combineLatest([this.conversations$, this.currentConversationId$])
      .pipe(
        map(([conversations, currConvId]) => {

          if (!currConvId) return null
          return conversations.find((conv) => conv.id === currConvId) || null
        })
      )
      .subscribe((conv) => this.currentConversation.next(conv))

    this.currentConversation$.subscribe(value => {
      this.fetchConversationMessages(value?.id ?? null)
    })
  }

  setCurrentConversationId(id: number | null) {
    this.currentConversationId.next(id)
  }

  private randomMessages = [
    'Xin chào!',
    'Hôm nay bạn thế nào?',
    'Angular thật tuyệt!',
    'RxJS rất mạnh mẽ!',
    'Bạn đã ăn chưa?',
    'Hãy code cùng nhau!'
  ]

  private generateRandomMessage(): Message {
    return {
      id: Math.floor(Math.random() * 10000), // ID ngẫu nhiên
      content: this.randomMessages[Math.floor(Math.random() * this.randomMessages.length)],
      sendAt: new Date().toISOString() // Lấy thời gian hiện tại
    }
  }

  fetchConversationMessages(convId: number | null) {
    if (convId) {

      setTimeout(() => {
        let messages = this.messages.get(convId)
        if (!messages) {
          messages = new BehaviorSubject<Message[]>([])
        }
        const value = messages.value
        const message = this.generateRandomMessage()
        messages.next([...value, message])


      }, 1000)
    }
  }


}
