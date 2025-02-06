import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core'
import {Message, MessageService} from '../core/service/message.service'
import {BehaviorSubject, Subscription, switchMap, tap} from 'rxjs'
import {ScrollLimitDirective} from '../core/shared/scroll-limit.directive'

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
      @for (msg of messages.values(); track msg.id) {
        <div class="message-line" [class.own-message-line]="msg.id % 2 == 0">
          <div class="message-box">{{ msg.content }}</div>
        </div>
      }
    </div>
  `
})
export class ConversationMessageComponent implements OnInit, OnDestroy {
  messages: Map<number, Message> = new Map()

  private messagesSub!: Subscription
  private currentConversationSub!: Subscription

  @ViewChild(ScrollLimitDirective, {static: true})
  private childComponent!: ScrollLimitDirective

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.messagesSub = this.messageService.getCurrentConversationMessagesObservable().subscribe(value => {
      this.messages = value
    })

    this.currentConversationSub = this.messageService.currentConversation$.pipe(
      tap(value => {
        if (value) {
          this.messageService.fetchConversationMessages(value.id)
        }
      }),
      switchMap(value =>
        this.childComponent.scrolledToBottom$.pipe(
          tap(() => {
            if (value) {
              this.messageService.fetchConversationMessages(value.id, 'eyJzZW5kQXQiOjE3Mzg2MDg4MjEuMTU4NjI1MDAwLCJpZCI6MTA5NjF9')
            }
          })
        )
      )
    ).subscribe()
  }

  ngOnDestroy() {
    this.messagesSub.unsubscribe()
    this.currentConversationSub.unsubscribe()
  }

}
