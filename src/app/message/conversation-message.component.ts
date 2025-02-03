import {Component} from '@angular/core'

@Component({
  selector: 'app-conversation-message',
  standalone: true,
  styles:`
    ul {
      background-color: aquamarine;
      height: 100%;
    }`,
  template: `
    <ul>
      <li>lorem</li>
      <li>lorem</li>
      <li>lorem</li>
      <li>lorem</li>
    </ul>
  `
})
export class ConversationMessageComponent{

}
