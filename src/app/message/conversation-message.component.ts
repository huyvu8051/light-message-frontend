import {Component, OnDestroy, OnInit} from '@angular/core'
import {Message, MessageService} from '../core/service/message.service'
import {Subscription} from 'rxjs'

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

    }
    .message-line {
    }
    .message-box{
      padding: 8px;
      border-radius: 8px;
      background-color: beige;
      display: block;
    }

  `,
  template: `
     <div class="message-scroll">
       @for (msg of messages; track msg.id) {
         <div class="message-line">
           <div class="message-box">{{ msg.content }}</div>
         </div>
       }
     </div>
  `
})
export class ConversationMessageComponent implements OnInit, OnDestroy {


  messages: Message[] = []
  messagesSubscription!: Subscription

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.messagesSubscription = this.messageService.getCurrentConversationMessagesObservable().subscribe(value => {
      this.messages = value
    })
  }

  ngOnDestroy() {
    this.messagesSubscription.unsubscribe()
  }
}
