import { Component, OnInit } from '@angular/core';

import { fadeInAnimation } from '../../_animations/route-animations';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.scss'],

  animations: [ fadeInAnimation ],
  host: { '[@fadeInAnimation]': '' }
})
export class LogoutPageComponent implements OnInit {

  constructor(
    private router: Router
    ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigateByUrl('/');
    }, 2000);
  }

}
