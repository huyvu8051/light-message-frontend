import {Component, OnDestroy, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {MessageService} from '../service/message.service'
import {Subject, takeUntil} from 'rxjs'
import {ConversationDatetimePipe} from '../shared/conversation-datetime.pipe'
import {Conversation, ConversationService} from '../service/conversation.service'


@Component({
  selector: 'app-aside-conversations',
  styles: `

    aside {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .nav-wrapper {
      flex-grow: 1;
      position: relative;
    }

    nav {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: auto;
    }

    aside > h3 {
      padding: 8px;
      margin: 8px;
      text-align: center;
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
      <div class="nav-wrapper">
        <nav>
          @for (conv of this.conversations; track conv.id) {
            <div (click)="onConversationClicked(conv.id)" class="nav-item"
                 [class.selected]="conv.id === selectedConvId">
              <h4 class="top">{{ conv.name }}</h4>
              <h5 class="bottom">{{ conv.message.sendAt | conversationDatetime }} : {{ conv.message.content }}</h5>
            </div>
          }
        </nav>
      </div>
    </aside>
  `,
  imports: [
    ConversationDatetimePipe
  ],
  standalone: true
})
export class AsideNavigatorComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService,
              private conversationService: ConversationService) {
  }

  selectedConvId: number = 0

  conversations: Conversation[] = []
  private destroy$ = new Subject<void>()

  ngOnInit() {

    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.selectedConvId = Number(params.get('convId')!)
        this.conversationService.setCurrentConversation(this.selectedConvId)
      })

    this.conversationService.conversations$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.conversations = data
      })

    this.conversationService.getConversations()
      .subscribe()


  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()

  }

  onConversationClicked(id: Number) {
    this.router.navigate(['message', id]).then(null)
  }
}
