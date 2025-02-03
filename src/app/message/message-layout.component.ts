import {Component, OnInit} from '@angular/core'
import {AsideConversationsComponent} from './aside-conversations.component'
import {MainContainerComponent} from './main-container.component'
import {MessageService} from '../core/service/message.service'
import {ActivatedRoute} from '@angular/router'

@Component({

  standalone: true,
  styles: `

    .layout {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .layout-body {
      flex-grow: 1;
      display: flex;
      flex-direction: row;
    }


    .layout-body > app-aside-conversations {
      width: 30%;
      background-color: #E0BBE4;
    }

    .layout-body > app-main-container {
      background-color: #472b4a;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }


    footer {
      background: #222;
      color: white;
      text-align: center;
      padding: 5px;
      font-size: 12px;
    }

  `,
  template: `
    <div class="layout">
      <div class="layout-body">
        <app-aside-conversations/>
        <app-main-container/>
      </div>
      <footer>
        <p>&copy; 2025 Light Message. All Rights Reserved.</p>
      </footer>

    </div>

  `,
  imports: [AsideConversationsComponent, MainContainerComponent]
})
export class MessageLayoutComponent implements OnInit {
  constructor(private route: ActivatedRoute, private messageService: MessageService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(value => {
      const convId = Number(value.get('convId'))
      this.messageService.setCurrentConversationId(convId)
    })
  }


}
