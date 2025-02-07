import {Injectable} from '@angular/core'
import {BehaviorSubject, tap} from 'rxjs'
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) {
  }

  auth(userId: number) {
    return this.httpClient.post<AuthRespDTO>('/api/v1/auth', {userId})
  }
}

interface AuthRespDTO {
  userId: number
}
