import {Component} from '@angular/core'
import {FormsModule} from '@angular/forms'

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

    .form-content {
      flex-grow: 1;
      padding: 8px;
    }

    button {
      margin-left: 8px;
      padding: 8px;
      font-weight: bold;
    }`,
  imports: [
    FormsModule
  ],
  template: `
    <form (ngSubmit)="onSubmit()">
      <textarea
        class="form-content"
        placeholder="Type something..."
        [(ngModel)]="content"
        name="message"
        (keydown.enter)="onEnter($event)"
      ></textarea>

      <button type="submit">Send</button>
    </form>

  `
})
export class ConversationInputComponent{
  content:string = ''
  onSubmit() {
    if(!this.content.trim()) return

    console.log(`submited ${this.content}`)
    this.content = ''
  }
  onEnter(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    if (!keyboardEvent.shiftKey) {
      keyboardEvent.preventDefault();
      this.onSubmit();
    }
  }

}
