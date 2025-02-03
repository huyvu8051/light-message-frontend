import {Component} from '@angular/core'

@Component({
  selector: 'app-conversation-input',
  standalone: true,
  template: `
    <form>
      <input type="text">
      <button type="submit">Send</button>
    </form>
  `
})
export class ConversationInputComponent{

}
