import {Injectable} from '@angular/core'
import {BehaviorSubject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId = new BehaviorSubject<number | null>(null)
  userId$ = this.userId.asObservable()

  setUserId(id: number) {
    this.userId.next(id)
  }
}
