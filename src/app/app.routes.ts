import {Routes} from '@angular/router'
import {SimpleAuthComponent} from './auth/simple-auth.component'
import {LayoutComponent} from './message/layout.component'

export const routes: Routes = [
  {
    path: 'auth/:userId',
    component: SimpleAuthComponent
  },
  {
    path: 'message/:convId',
    component: LayoutComponent
  },
  {
    path: 'message',
    component: LayoutComponent
  }
]
