import {Component, OnInit} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {Conversation, MessageService} from '../core/service/message.service'

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
        [(ngModel)]="currentConversation.textbox"
        name="message"
        (keydown.enter)="onEnter($event)"
      ></textarea>

        <button type="submit">Send</button>
      </form>
    } @else {
      <h3>please select a conversation</h3>
    }


  `
})
export class ConversationInputComponent implements OnInit{
  currentConversation: Conversation | null = null

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.messageService.currentConversation$.subscribe(value => {
      this.currentConversation = value
    })
  }

  onSubmit() {
    if(this.currentConversation){
      if(!this.currentConversation.textbox.trim()) return

      console.log(`submited ${this.currentConversation.textbox}`)
      this.currentConversation.textbox = ''
    }
  }
  onEnter(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    if (!keyboardEvent.shiftKey) {
      keyboardEvent.preventDefault();
      this.onSubmit();
    }
  }

}
