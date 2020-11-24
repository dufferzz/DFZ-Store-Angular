import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentSuccessRoutingModule } from './payment-success-routing.module';
import { PaymentSuccessComponent } from './payment-success.component';
import {
  FontAwesomeModule
} from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [PaymentSuccessComponent],
  imports: [
    CommonModule,
    PaymentSuccessRoutingModule,
    FontAwesomeModule
  ]
})
export class PaymentSuccessModule { }
