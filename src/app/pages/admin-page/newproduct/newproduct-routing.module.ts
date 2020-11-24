import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewproductComponent } from './newproduct.component';

const routes: Routes = [{ path: '', component: NewproductComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewproductRoutingModule { }
