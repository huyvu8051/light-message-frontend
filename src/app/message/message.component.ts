import {Component} from '@angular/core'

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


    .layout-body > aside {
      width: 200px;
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
        <aside>
          <h3>Conversations</h3>
          <nav>
            <a href="#">Conversation 1</a>
            <a href="#">Conversation 2</a>
            <a href="#">Conversation 3</a>
          </nav>
        </aside>

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

  `
})
export class MessageComponent{

}
