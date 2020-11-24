import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPageRoutingModule } from './admin-page-routing.module';
import { AdminPageComponent } from './admin-page.component';
import { NavModule } from './nav/nav.module';
import { AdminNavComponent } from './nav/nav.component';
import { SessionsModule } from './sessions/sessions.module';


@NgModule({
  declarations: [AdminPageComponent, AdminNavComponent],
  imports: [
    CommonModule,
    AdminPageRoutingModule,
    NavModule,
    SessionsModule
  ]
})
export class AdminPageModule { }
