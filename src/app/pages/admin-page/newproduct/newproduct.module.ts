import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewproductRoutingModule } from './newproduct-routing.module';
import { NewproductComponent } from './newproduct.component';
import { QuillModule } from 'ngx-quill'
import { QuillService } from 'src/app/_services/quill.service';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewproductComponent],
  imports: [
    CommonModule,
    NewproductRoutingModule,
    QuillModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [
    QuillService
  ]
})
export class NewproductModule { }
