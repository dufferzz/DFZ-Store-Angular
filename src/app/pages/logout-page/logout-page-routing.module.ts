import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogoutPageComponent } from './logout-page.component';

const routes: Routes = [{ path: '', component: LogoutPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogoutPageRoutingModule { }
