import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {MessageService} from '../service/message.service'
import {map, Subject, Subscription, switchMap, takeUntil, tap} from 'rxjs'
import {Conversation, ConversationService} from '../service/conversation.service'
import {append} from '../models/CursorPage'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-conversation-input',
  standalone: true,
  styles: `
    form {
      height: 64px;
      padding: 8px;
      display: flex;
      flex-direction: row;
    }

    .form-textbox {
      flex-grow: 1;
      padding: 8px;
      border-radius: 8px;
    }

    button {
      margin-left: 8px;
      padding: 8px;
      font-weight: bold;
      border-radius: 8px;
    }`,
  imports: [
    FormsModule
  ],
  template: `
    @if (currentConversation) {
      <form (ngSubmit)="onSubmit()">
      <textarea
        class="form-textbox"
        placeholder="Type something..."
        [(ngModel)]="textbox"
        name="message"
        (keydown.enter)="onEnter($event)"
      ></textarea>

        <button type="submit">Send</button>
      </form>
    }
  `
})
export class InputComponent implements OnInit, OnDestroy {
  currentConversation: Conversation | null = null
  textbox = ''

  private destroy$ = new Subject<void>()

  constructor(private route: ActivatedRoute, private conversationService: ConversationService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map(params => Number(params.get('convId')!)),
        switchMap(currConv => this.conversationService.fetchConversation(currConv)),
        tap(conv => this.currentConversation = conv),
        tap(() => this.textbox = ''),
        takeUntil(this.destroy$))
      .subscribe()


  }

  onSubmit() {
    if (!this.currentConversation) return
    if (!this.currentConversation.textbox) return
    if (!this.currentConversation.textbox.trim()) return

    this.messageService.sendMessage(this.currentConversation.id, this.currentConversation.textbox)
      .subscribe()
    this.currentConversation.textbox = ''
  }

  onEnter(event: Event) {
    const keyboardEvent = event as KeyboardEvent
    if (!keyboardEvent.shiftKey) {
      keyboardEvent.preventDefault()
      this.onSubmit()
    }
  }


  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
