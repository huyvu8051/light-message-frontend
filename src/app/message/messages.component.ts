import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {Message, MessageService} from '../service/message.service'
import {exhaustMap, filter, map, Subject, switchMap, takeUntil, tap} from 'rxjs'
import {ScrollLimitDirective} from '../shared/scroll-limit.directive'
import {ConversationService} from '../service/conversation.service'
import {append, appendOne, CursorPagingResponseDTO} from '../models/CursorPage'
import {ActivatedRoute} from '@angular/router'
import {SocketService} from '../service/socket.service'

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
  messages: CursorPagingResponseDTO<Message> = this.getDefaultMessages()

  convId: number | null = null

  @ViewChild(ScrollLimitDirective, {static: true})
  private scrollLimitDirective!: ScrollLimitDirective

  constructor(private messageService: MessageService,
              private conversationService: ConversationService,
              private route: ActivatedRoute,
              private socket: SocketService) {
  }

  private destroy$ = new Subject<void>()

  ngOnInit() {

    this.route.paramMap
      .pipe(
        map(params=>params.get('convId')),
        filter(convId=>!!convId),
        map(convId => Number(convId!)),
        tap(convId => this.convId = convId),
        tap(() => this.messages = this.getDefaultMessages()),
        switchMap(currConv => {
          console.log('init', currConv)
          return this.messageService.fetchConversationMessages(currConv)
        }),
        tap(msg => this.messages = append(this.messages, msg)),
        takeUntil(this.destroy$))
      .subscribe()

    this.scrollLimitDirective.scrolledToBottom$.pipe(
      filter(() => !!this.convId),
      exhaustMap(() => {
        console.log('scroll')
        return this.messageService.fetchConversationMessages(this.convId, this.messages.nextCursor)
      }),
      tap(resp => this.messages = append(this.messages, resp)),
      takeUntil(this.destroy$)
    ).subscribe()

    this.socket.onMessage$
      .pipe(
        filter(value => this.convId == value.convId),
        tap(value => {
          this.messages = appendOne(this.messages, value)
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()


  }


  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private getDefaultMessages(): CursorPagingResponseDTO<Message> {
    return {
      data: [],
      nextCursor: ''
    }
  }

}
