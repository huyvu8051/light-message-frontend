import {Component} from '@angular/core'

class Message {
  id: Number
  content: String
  sendAt: String
  constructor(id: Number,
  content: String, sendAt: String) {
    this.id = id;
    this. content = content
    this.sendAt = sendAt
  }
}

class Conversation {
  id: Number
  name: String
  message: Message
  constructor(id: Number,
              name: String, message: Message) {
    this.id = id;
    this.name = name;
    this.message = message
  }
}

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
      width: 30%;
      background-color: #E0BBE4;
    }

    aside > h3 {
      padding: 4px;
      text-align: center;
      margin: 8px;
    }

    nav > .nav-item {
      height: 44px;
      background-color: #957DAD;
      margin: 4px;
      border-radius: 4px;
      padding: 4px;
      display: flex;
      flex-direction: column;
      cursor: pointer;
    }



    .nav-item > .top {
      display: block;
      max-width: 100%;
      margin-bottom: 4px;
    }

    .nav-item > .bottom {
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
      display: inline-block;


      overflow: hidden;
      max-width: 100%;
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
        <aside>
          <h3>Conversations</h3>
          <nav>
            @for (conv of this.conversations; track conv.id) {
              <div class="nav-item">
                <h4 class="top">{{ conv.name }}</h4>
                <h5 class="bottom">{{ conv.message.sendAt }} : {{ conv.message.content }}</h5>
              </div>
            }
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
export class MessageLayoutComponent {
  conversations: Conversation[] = [{
    id: 1,
    name: 'Son Tung M-TP',
    message: {
      id: 4,
      content: 'Dung lam trai tim anh dau, co chac yeu la day',
      sendAt: 'Tue'
    }
  }, {
    id: 2,
    name: 'Hai Tu',
    message: {
      id: 5,
      content: 'Vay thi anh xin chet vi nguoi anh thuong',
      sendAt: '16:22'
    }
  }, {
    id: 3,
    name: 'Ho Quang Hieu',
    message: {
      id: 6,
      content: 'Co biet bao nhieu dieu con dang van vuong',
      sendAt: 'Mon'
    }
  }]

  protected readonly Conversation = Conversation
}
