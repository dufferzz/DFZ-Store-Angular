import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrandPageComponent } from './brand-page.component';

const routes: Routes = [
  // {
    // path: '', component: BrandPageComponent
//  },
 {
  path: ':id', component: BrandPageComponent
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandPageRoutingModule { }
