import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandPageRoutingModule } from './brand-page-routing.module';
import { BrandPageComponent } from './brand-page.component';


@NgModule({
  declarations: [BrandPageComponent],
  imports: [
    CommonModule,
    BrandPageRoutingModule
  ]
})
export class BrandPageModule { }
