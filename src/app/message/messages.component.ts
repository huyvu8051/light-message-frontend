import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core'
import {Message, MessageService} from '../service/message.service'
import {combineLatest, exhaustMap, filter, map, of, pipe, Subject, Subscription, switchMap, takeUntil, tap} from 'rxjs'
import {ScrollLimitDirective} from '../shared/scroll-limit.directive'
import {ConversationService} from '../service/conversation.service'
import {CursorPagingResponseDTO, CursorPagingView} from '../models/CursorPage'

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
  messages: CursorPagingView<Message> = this.getDefaultMessages()

  convId: number | null = null

  @ViewChild(ScrollLimitDirective, {static: true})
  private scrollLimitDirective!: ScrollLimitDirective

  constructor(private messageService: MessageService, private conversationService: ConversationService) {
  }

  private destroy$ = new Subject<void>()

  ngOnInit() {
    this.conversationService.currConv$.pipe(
      filter(currConv => !!currConv),
      tap(currConv=>this.convId = currConv.id),
      tap(()=>this.messages = this.getDefaultMessages()),
      switchMap(currConv => this.messageService.fetchConversationMessages(currConv.id)),
      tap(msg => this.messages = this.append(this.messages, msg)),
      takeUntil(this.destroy$)
    ).subscribe()


    this.scrollLimitDirective.scrolledToBottom$.pipe(
      filter(() => !!this.convId),
      exhaustMap(() => this.messageService.fetchConversationMessages(this.convId, this.messages.nextCursor)),
      tap(resp=> this.messages = this.append(this.messages, resp)),
      takeUntil(this.destroy$)
    ).subscribe()


  }


  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private getDefaultMessages(): CursorPagingView<Message> {
    return {
      data: new Map(),
      nextCursor: ''
    }
  }

  private append(messages: CursorPagingView<Message>, c: CursorPagingResponseDTO<Message>): CursorPagingView<Message> {
    const data = messages.data
    c.data.forEach(e => data.set(e.id, e))
    return {
      data,
      nextCursor: c.nextCursor
    }
  }
}
