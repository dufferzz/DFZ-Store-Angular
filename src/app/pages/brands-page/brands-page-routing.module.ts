import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrandsPageComponent } from './brands-page.component';

const routes: Routes = [{ path: '', component: BrandsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsPageRoutingModule { }
