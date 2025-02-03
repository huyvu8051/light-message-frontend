import {Injectable, OnInit} from '@angular/core'
import {BehaviorSubject, combineLatest, map, Observable} from 'rxjs'
import {ActivatedRoute} from '@angular/router'

export interface Message {
  id: number;
  content: string;
  sendAt: string;
}

export interface Conversation {
  id: number;
  name: string;
  message: Message;
}


@Injectable({
  providedIn: 'root'
})
export class MessageService implements OnInit {
  private conversations = new BehaviorSubject<Conversation[]>([])
  private currentConversation = new BehaviorSubject<Conversation | null>(null)
  conversations$: Observable<Conversation[]> = this.conversations.asObservable()
  currentConversation$: Observable<Conversation | null> = this.currentConversation.asObservable()
  selectedConvId: number | null = null

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    // Listen to URL changes and update `selectedConvId`
    this.route.paramMap.subscribe((params) => {
      this.selectedConvId = Number(params.get('convId')!)
      this.updateCurrentConversation()
    })

    // Simulate API fetch with setTimeout
    setTimeout(() => {
      const mockData: Conversation[] = [
        {
          id: 1,
          name: 'Son Tung M-TP',
          message: {id: 4, content: 'Dung lam trai tim anh dau, co chac yeu la day', sendAt: 'Tue'}
        },
        {
          id: 2,
          name: 'Hai Tu',
          message: {id: 5, content: 'Vay thi anh xin chet vi nguoi anh thuong', sendAt: '16:22'}
        },
        {
          id: 3,
          name: 'Ho Quang Hieu',
          message: {id: 6, content: 'Co biet bao nhieu dieu con dang van vuong', sendAt: 'Mon'}
        }
      ]
      this.conversations.next(mockData) // Emit new conversation list
    }, 500)

    // Auto-update `currentConversation` when `conversations` or `selectedConvId` changes
    combineLatest([this.conversations$, this.route.paramMap])
      .pipe(
        map(([conversations, params]) => {
          const convId = Number(params.get('convId')!)
          return conversations.find((conv) => conv.id === convId) || null
        })
      )
      .subscribe((conv) => this.currentConversation.next(conv))
  }

  /** Update `currentConversation` manually when needed */
  private updateCurrentConversation() {
    const currentConv = this.conversations.value.find((conv) => conv.id === this.selectedConvId) || null
    this.currentConversation.next(currentConv)
  }
}
