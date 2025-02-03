import {Component, Inject} from '@angular/core'
import {ActivatedRoute, Route, Router} from '@angular/router'
import {Conversation, MessageService} from '../core/service/message.service'
import {Subscription} from 'rxjs'
import {ConversationDatetimePipe} from '../core/shared/conversation-datetime.pipe'


@Component({
  selector: 'app-aside-conversations',
  styles: `
    aside > h3 {
      padding: 4px;
      text-align: center;
      margin: 8px;
    }

    .nav-item {
      height: 54px;
      background-color: #8d64b8;
      margin: 8px;
      border-radius: 8px;
      padding: 8px;
      cursor: pointer;
    }

    .nav-item.selected {
      background-color: #bd8a9a; /* Change to your preferred highlight color */
      color: black;
      font-weight: bold;
    }


    .nav-item > .top {
      display: block;
      margin-bottom: 4px;
    }

    .nav-item > .bottom, .top {
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
      display: inline-block;
      overflow: hidden;
      max-width: 100%;
    }
  `,
  template: `
    <aside>
      <h3>Conversations</h3>
      <nav>
        @for (conv of this.conversations; track conv.id) {
          <div (click)="onConversationClicked(conv.id)" class="nav-item" [class.selected]="conv.id === selectedConvId">
            <h4 class="top">{{ conv.name }}</h4>
            <h5 class="bottom">{{ conv.message.sendAt | conversationDatetime }} : {{ conv.message.content }}</h5>
          </div>
        }
      </nav>
    </aside>
  `,
  imports: [
    ConversationDatetimePipe
  ],
  standalone: true
})
export class AsideConversationsComponent {
  constructor(private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService) {
  }

  selectedConvId: number = 0
  private selectedConvIdSubscription!: Subscription

  conversations: Conversation[] = []
  private conversationsSubscription!: Subscription


  ngOnInit() {
    this.selectedConvIdSubscription = this.route.paramMap.subscribe(params => {
      this.selectedConvId = Number(params.get('convId')!)
    })

    this.conversationsSubscription = this.messageService.conversations$.subscribe((data) => {
      this.conversations = data
    })

  }

  ngOnDestroy() {
    this.conversationsSubscription.unsubscribe()
    this.selectedConvIdSubscription.unsubscribe()
  }

  onConversationClicked(id: Number) {
    this.router.navigate(['message', id]).then(null)
  }
}
