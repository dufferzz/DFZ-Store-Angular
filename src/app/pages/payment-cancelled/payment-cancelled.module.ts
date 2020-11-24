import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentCancelledRoutingModule } from './payment-cancelled-routing.module';
import { PaymentCancelledComponent } from './payment-cancelled.component';


@NgModule({
  declarations: [PaymentCancelledComponent],
  imports: [
    CommonModule,
    PaymentCancelledRoutingModule
  ]
})
export class PaymentCancelledModule { }
