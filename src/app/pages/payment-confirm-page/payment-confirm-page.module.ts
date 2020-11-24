import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentConfirmPageRoutingModule } from './payment-confirm-page-routing.module';
import { PaymentConfirmPageComponent } from './payment-confirm-page.component';


@NgModule({
  declarations: [PaymentConfirmPageComponent],
  imports: [
    CommonModule,
    PaymentConfirmPageRoutingModule
  ]
})
export class PaymentConfirmPageModule { }
