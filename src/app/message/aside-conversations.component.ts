import {Component} from '@angular/core'
import {ActivatedRoute, Route, Router} from '@angular/router'



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
  selector: 'app-aside-conversations',
  styles:  `
    aside > h3 {
      padding: 4px;
      text-align: center;
      margin: 8px;
    }

    .nav-item {
      height: 44px;
      background-color: #957DAD;
      margin: 4px;
      border-radius: 4px;
      padding: 4px;
      display: flex;
      flex-direction: column;
      cursor: pointer;
    }

    .nav-item.selected {
      background-color: #bd8a9a; /* Change to your preferred highlight color */
      color: black;
      font-weight: bold;
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
  `,
  template: `
    <aside>
      <h3>Conversations</h3>
      <nav>
        @for (conv of this.conversations; track conv.id) {
          <div (click)="onConversationClicked(conv.id)" class="nav-item" [class.selected]="conv.id === selectedConvId">
            <h4 class="top">{{ conv.name }}</h4>
            <h5 class="bottom">{{ conv.message.sendAt }} : {{ conv.message.content }}</h5>
          </div>
        }
      </nav>
    </aside>
  `,
  standalone: true
})
export class AsideConversationsComponent{
  selectedConvId: number = 0
  constructor(private route: ActivatedRoute, private router: Router) {
  }

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

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selectedConvId = Number(params.get('convId')!)
    });


  }

  onConversationClicked(id: Number) {
    this.router.navigate(['message', id]).then(null)
  }
}
