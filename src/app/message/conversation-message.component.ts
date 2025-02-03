import {Component, OnDestroy, OnInit} from '@angular/core'
import {Message, MessageService} from '../core/service/message.service'
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-conversation-message',
  standalone: true,
  styles: `
    ul {
      background-color: aquamarine;
      height: 100%;
    }`,
  template: `
    <ul>
      @for (msg of messages; track msg.id) {
        <li>{{ msg.content }}</li>
      }
    </ul>
  `
})
export class ConversationMessageComponent implements OnInit, OnDestroy {


  messages: Message[] = []
  messagesSubscription!: Subscription

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.messageService.getCurrentConversationMessagesObservable().subscribe(value => {
      this.messages = value
    })
  }

  ngOnDestroy() {
    this.messagesSubscription.unsubscribe()
  }
}
