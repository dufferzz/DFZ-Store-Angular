import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountPageComponent } from './account-page.component';
import { QuillService } from 'src/app/_services/quill.service';

const routes: Routes = [{ path: '', component: AccountPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[
    QuillService
  ]
})
export class AccountPageRoutingModule { }
