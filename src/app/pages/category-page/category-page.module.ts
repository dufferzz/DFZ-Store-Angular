import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryPageRoutingModule } from './category-page-routing.module';
import { CategoryPageComponent } from './category-page.component';


@NgModule({
  declarations: [CategoryPageComponent],
  imports: [
    CommonModule,
    CategoryPageRoutingModule
  ]
})
export class CategoryPageModule { }
