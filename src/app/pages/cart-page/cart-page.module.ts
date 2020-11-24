import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartPageRoutingModule } from './cart-page-routing.module';
import { CartPageComponent } from './cart-page.component';
import {
  FontAwesomeModule
} from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [CartPageComponent],
  imports: [
    CommonModule,
    CartPageRoutingModule,
    FontAwesomeModule
  ]
})
export class CartPageModule { }
