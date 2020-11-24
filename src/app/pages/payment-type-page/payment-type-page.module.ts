import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';

import {
  PaymentTypePageRoutingModule
} from './payment-type-page-routing.module';
import {
  PaymentTypePageComponent
} from './payment-type-page.component';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  NgxStripeModule
} from 'ngx-stripe';

@NgModule({
  declarations: [PaymentTypePageComponent],
  imports: [
    CommonModule,
    PaymentTypePageRoutingModule,
    NgxStripeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    NgxStripeModule
  ]
})
export class PaymentTypePageModule {}
