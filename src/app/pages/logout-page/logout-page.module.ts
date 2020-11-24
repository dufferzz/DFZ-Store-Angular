import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoutPageRoutingModule } from './logout-page-routing.module';
import { LogoutPageComponent } from './logout-page.component';


@NgModule({
  declarations: [LogoutPageComponent],
  imports: [
    CommonModule,
    LogoutPageRoutingModule
  ]
})
export class LogoutPageModule { }
