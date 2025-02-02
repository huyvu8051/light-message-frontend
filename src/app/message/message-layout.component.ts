import {Component} from '@angular/core'
import {AsideConversationsComponent} from './aside-conversations.component'

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




    .layout-body > .main-container {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }

    .main-container > header {
      background-color: #FEC8D8;
      height: 48px;
    }


    .main-container > main {
      background-color: #FFDFD3;
      flex-grow: 1;
      padding: 16px;
    }


    footer {
      background: #222;
      color: white;
      text-align: center;
      padding: 5px;
    }

  `,
  template: `
    <div class="layout">
      <div class="layout-body">
        <app-aside-conversations/>

        <div class="main-container">
          <header>
            <span>Avatar</span>
            <span>Conversation name</span>
            <span>Options</span>
          </header>
          <main>
            <ul>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
            </ul>
          </main>
        </div>
      </div>
      <footer>
        <p>&copy; 2025 Light Message. All Rights Reserved.</p>
      </footer>

    </div>

  `,
  imports: [AsideConversationsComponent],
})
export class MessageLayoutComponent {


}
