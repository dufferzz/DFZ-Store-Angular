import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionComponent } from './transaction.component';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import {
  FontAwesomeModule
} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [TransactionComponent],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    FontAwesomeModule,

  ]
})
export class TransactionModule { }
