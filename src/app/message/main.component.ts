import {Component, OnDestroy, OnInit} from '@angular/core'
import {Message, MessageService} from '../service/message.service'
import {map, Subject, Subscription, switchMap, takeUntil, tap} from 'rxjs'
import {MessagesComponent} from './messages.component'
import {InputComponent} from './input.component'
import {Conversation, ConversationService} from '../service/conversation.service'
import {append} from '../models/CursorPage'
import {ActivatedRoute, Route} from '@angular/router'

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

    app-conversation-message {
      flex-grow: 1;
    }

    app-conversation-message {
      position: relative;
    }

  `,
  template: `
    <header>
      <h2>{{ currentConversation?.name }}</h2>
    </header>
    <main>
      <app-conversation-message/>
      <app-conversation-input/>
    </main>
  `,
  imports: [
    MessagesComponent,
    InputComponent
  ],
  standalone: true
})
export class MainComponent implements OnInit, OnDestroy {
  currentConversation: Conversation | null = null
  private destroy$ = new Subject<void>()

  constructor(private route: ActivatedRoute, private messageService: MessageService, private conversationService: ConversationService) {

  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map(params => Number(params.get('convId')!)),
        tap(()=>this.currentConversation = null),
        switchMap(currConv => this.conversationService.fetchConversation(currConv)),
        tap(conv =>this.currentConversation = conv),
        takeUntil(this.destroy$))
      .subscribe()
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
