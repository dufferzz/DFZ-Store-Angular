import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductPageComponent } from './product-page.component';

const routes: Routes = [{ path: ':id', component: ProductPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductPageRoutingModule { }
