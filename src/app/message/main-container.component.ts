import {Component} from '@angular/core'
import {Conversation, MessageService} from '../core/service/message.service'
import {BehaviorSubject, Subscription} from 'rxjs'

@Component({
  selector: 'app-main-container',
  styles: `


    header {
      background-color: #FEC8D8;
      height: 48px;
      text-align: center;
    }

    header > h2 {
      line-height: 48px;
    }


    main {
      background-color: #FFDFD3;
      flex-grow: 1;
      padding: 16px;
    }

  `,
  template: `
    <header>
      <h2>Conversation name</h2>
    </header>
    <main>
      <ul>
        <li>lorem</li>
        <li>lorem</li>
        <li>lorem</li>
        <li>lorem</li>
      </ul>
    </main>
  `,
  standalone: true
})
export class MainContainerComponent{
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
