import {Routes} from '@angular/router'
import {SimpleAuthComponent} from './auth/simple-auth.component'
import {MessageLayoutComponent} from './message/message-layout.component'

export const routes: Routes = [
  {
    path: 'auth/:userId',
    component: SimpleAuthComponent
  },
  {
    path: 'message/:convId',
    component: MessageLayoutComponent
  },
  {
    path: 'message',
    component: MessageLayoutComponent
  }
]
