import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core'
import {Message, MessageService} from '../service/message.service'
import {filter, pipe, Subject, Subscription, switchMap, takeUntil, tap} from 'rxjs'
import {ScrollLimitDirective} from '../shared/scroll-limit.directive'
import {ConversationService} from '../service/conversation.service'
import {CursorPagingView} from '../models/CursorPage'
import {combineLatest} from 'rxjs/internal/operators/combineLatest'

@Component({
  selector: 'app-conversation-message',
  standalone: true,
  styles: `
    .message-scroll {
      background-color: aquamarine;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: auto;
      display: flex;
      flex-direction: column-reverse;
    }

    .message-line {
      margin-bottom: 8px;
      margin-left: 8px;
      margin-right: 8px;
    }

    .own-message-line {
      text-align: right;
    }

    .own-message-line > .message-box {
      background-color: coral;
    }

    .message-box {
      padding: 8px;
      border-radius: 8px;
      background-color: beige;
      display: inline-block;
      max-width: calc(100% - 32px);

    }

  `,
  imports: [
    ScrollLimitDirective
  ],
  template: `
    <div class="message-scroll" appScrollLimit>
      @for (msg of messages.data.values(); track msg.id) {
        <div class="message-line" [class.own-message-line]="msg.id % 2 == 0">
          <div class="message-box">{{ msg.content }}</div>
        </div>
      }
    </div>
  `
})
export class MessagesComponent implements OnInit, OnDestroy {
  messages: CursorPagingView<Message> = {
    data: new Map(),
    nextCursor: ''
  }

  private currentConversationSub!: Subscription

  @ViewChild(ScrollLimitDirective, {static: true})
  private childComponent!: ScrollLimitDirective

  constructor(private messageService: MessageService, private conversationService: ConversationService) {
  }

  private destroy$ = new Subject<void>()

  ngOnInit() {
    this.currentConversationSub = this.conversationService.currConv$.pipe(
      filter(currConv => !!currConv),
      tap(currConv => this.messageService.fetchConversationMessages(currConv.id)),
      switchMap(currConv => {
        return this.messageService.getCurrentConversationMessagesObservable(currConv.id)
      }),
      tap(currMsg => {
        this.messages = currMsg
      }),
      takeUntil(this.destroy$)
    ).subscribe()
  }


  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
    this.currentConversationSub.unsubscribe()
  }
}
