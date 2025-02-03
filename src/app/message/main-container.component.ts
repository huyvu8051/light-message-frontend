import {Component, OnDestroy, OnInit} from '@angular/core'
import {Conversation, MessageService} from '../core/service/message.service'
import {BehaviorSubject, Subscription} from 'rxjs'
import {ConversationMessageComponent} from './conversation-message.component'
import {ConversationInputComponent} from './conversation-input.component'

@Component({
  selector: 'app-main-container',
  styles: `


    header {
      background-color: #FEC8D8;
      height: 48px;
      text-align: left;
    }

    header > h2 {
      line-height: 48px;

      margin-left: 16px;
    }


    main {
      background-color: #FFDFD3;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }

    .no-conversation {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    app-conversation-message{
      flex-grow: 1;
    }
    app-conversation-message{
      position: relative;
    }

  `,
  template: `
    @if (currentConversation) {
      <header>
        <h2>{{ currentConversation.name }}</h2>
      </header>
      <main>
        <app-conversation-message/>
        <app-conversation-input/>
      </main>
    } @else {
      <span class="no-conversation">
        Open a conversation
      </span>
    }
  `,
  imports: [
    ConversationMessageComponent,
    ConversationInputComponent
  ],
  standalone: true
})
export class MainContainerComponent implements OnInit, OnDestroy{
  currentConversation: Conversation | null = null;
  private currentConversationSubscription!: Subscription

  constructor(private messageService:MessageService) {

  }

  ngOnInit(){
    this.currentConversationSubscription = this.messageService.currentConversation$.subscribe((data) => {
      this.currentConversation = data
    })
  }
  ngOnDestroy() {
    this.currentConversationSubscription.unsubscribe()
  }
}
