import {Routes} from '@angular/router'
import {SimpleAuthComponent} from './auth/simple-auth.component'
import {MessageComponent} from './message/message.component'

export const routes: Routes = [
  {
    path: 'auth/:userId',
    component: SimpleAuthComponent
  },
  {
    path: 'message',
    component: MessageComponent
  }
]
