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
    this.httpClient.post<AuthRespDTO>('/api/v1/auth', {userId})
      .subscribe(value => {
        this.userId.next(value.userId)
      })
  }
}

interface AuthRespDTO {
  userId: number
}
