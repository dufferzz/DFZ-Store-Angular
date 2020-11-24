import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandsPageRoutingModule } from './brands-page-routing.module';
import { BrandsPageComponent } from './brands-page.component';


@NgModule({
  declarations: [BrandsPageComponent],
  imports: [
    CommonModule,
    BrandsPageRoutingModule
  ]
})
export class BrandsPageModule { }
