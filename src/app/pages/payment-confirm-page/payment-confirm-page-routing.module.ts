import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentConfirmPageComponent } from './payment-confirm-page.component';

const routes: Routes = [{ path: '', component: PaymentConfirmPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentConfirmPageRoutingModule { }
