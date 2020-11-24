import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentTypePageComponent } from './payment-type-page.component';

const routes: Routes = [{ path: '', component: PaymentTypePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentTypePageRoutingModule { }
