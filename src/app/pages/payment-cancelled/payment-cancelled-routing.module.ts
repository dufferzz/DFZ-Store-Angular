import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentCancelledComponent } from './payment-cancelled.component';

const routes: Routes = [{ path: '', component: PaymentCancelledComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentCancelledRoutingModule { }
