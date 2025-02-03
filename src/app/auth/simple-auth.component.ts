import {Component} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {AuthService} from '../core/service/auth.service'

@Component({
  template: `
    <h1>User id: {{ userId }}</h1>
  `,
  standalone: true
})
export class SimpleAuthComponent {
  userId: number = 0

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'))
    this.authService.setUserId(this.userId)
    this.router.navigate(['message']).then(null)

  }
}
