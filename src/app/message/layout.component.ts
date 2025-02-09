import {Component, OnDestroy, OnInit} from '@angular/core'
import {AsideNavigatorComponent} from './aside-navigator.component'
import {MainComponent} from './main.component'
import {ActivatedRoute} from '@angular/router'
import {ConversationService} from '../service/conversation.service'

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
  imports: [AsideNavigatorComponent, MainComponent]
})
export class LayoutComponent implements OnInit, OnDestroy {


  constructor(private route: ActivatedRoute, private conversationService: ConversationService) {
  }

  ngOnInit() {


  }

  ngOnDestroy() {

  }

}
