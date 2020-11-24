import { Component, OnInit } from '@angular/core';
import {
  AuthService
} from '../../_auth/auth0.service';
import {
  AdminGuard
} from '../../_auth/admin.guard';
import {
  ngIfAnimation
} from '../../_animations/ngIfAnimations';
import {
  fadeInAnimation
} from '../../_animations/route-animations';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  animations: [fadeInAnimation, ngIfAnimation],
  host: {
    '[@fadeInAnimation]': ''
  }

})
export class AdminPageComponent implements OnInit {
role: string;
  constructor(
    public auth: AuthService,

  ) {}

getSessions(){

}

  async ngOnInit() {

  }

}
