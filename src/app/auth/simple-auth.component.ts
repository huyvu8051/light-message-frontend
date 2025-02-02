import {Component} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'

@Component({
  template: `
    <h1>User id: {{ userId }}</h1>
  `,
  standalone: true
})
export class SimpleAuthComponent {
  userId: Number = 0

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'))
    this.router.navigate(['message']).then(null)

  }
}
