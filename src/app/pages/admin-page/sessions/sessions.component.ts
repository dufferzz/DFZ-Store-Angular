import { Component, OnInit } from '@angular/core';

import {
  ApiService
} from '../../../_services/api.service';
import {
  ngIfAnimation
} from '../../../_animations/ngIfAnimations';
import {
  fadeInAnimation
} from '../../../_animations/route-animations';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss'],
  animations: [fadeInAnimation, ngIfAnimation],
  host: {
    '[@fadeInAnimation]': ''
  }
})
export class SessionsComponent implements OnInit {
loading: boolean = true;
payments: any;
  constructor(
    private api: ApiService,

  ) { }
  getAllTransactions(){
    this.api.get('https://api.dufferz.net/v2/payments/list').subscribe(
      res => {
        this.payments = res.sessions;
        this.loading = false;
        console.log(this.payments)
      });
  }
  ngOnInit(): void {
    this.getAllTransactions()
  }

}
