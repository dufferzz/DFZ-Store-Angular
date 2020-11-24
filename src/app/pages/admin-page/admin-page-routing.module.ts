import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import {
  AdminPageComponent
} from './admin-page.component';

const routes: Routes = [{
  path: '',
  component: AdminPageComponent
},
  { path: 'new-product', loadChildren: () => import('./newproduct/newproduct.module').then(m => m.NewproductModule) },
  { path: 'sessions', loadChildren: () => import('./sessions/sessions.module').then(m => m.SessionsModule) },
  { path: 'transaction/:id', loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule) },
  { path: 'transaction', loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule) }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPageRoutingModule {}
