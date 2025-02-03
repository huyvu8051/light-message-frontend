import {Injectable} from '@angular/core'
import {BehaviorSubject} from 'rxjs'
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId = new BehaviorSubject<number | null>(null)
  userId$ = this.userId.asObservable()

  constructor(private httpClient: HttpClient) {
  }

  auth(userId: number) {
    this.httpClient.post('/api/v1/auth', {userId})
      .subscribe(value => {
        const auth = value as AuthRespDTO
        this.userId.next(auth.userId)
      })
  }
}

interface AuthRespDTO {
  userId: number
}
