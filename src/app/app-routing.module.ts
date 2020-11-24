import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  PreloadAllModules
} from '@angular/router';

import {
  HomePageComponent
} from './pages/home-page/home-page.component'
import {
  AuthGuard
} from './_auth/auth0.guard';
import {
  AdminGuard
} from './_auth/admin.guard';
import {
  LogoutPageComponent
} from './pages/logout-page/logout-page.component';
import {
  CallbackComponent
} from './callback/callback.component';
import {
  AccountPageComponent
} from './pages/account-page/account-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';


const routes: Routes = [
  // {
  //   path: '',
  //   component: HomePageComponent,
  // },

  {

    path: '',
    loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule)
  }, {
    path: 'about',
    loadChildren: () => import('./pages/about-page/about-page.module').then(m => m.AboutPageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./pages/category-page/category-page.module').then(m => m.CategoryPageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/product-page/product-page.module').then(m => m.ProductPageModule)
  },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule)
  // },
  {
    path: 'logout',
    loadChildren: () => import('./pages/logout-page/logout-page.module').then(m => m.LogoutPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart-page/cart-page.module').then(m => m.CartPageModule)
  },
  {
    path: 'special',
    component: AccountPageComponent,
     canActivate: [
      AuthGuard
     ]
    // Add this to guard this route

  }, {
    path: 'callback',
    component: CallbackComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account-page/account-page.module').then(m => m.AccountPageModule),
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin-page/admin-page.module').then(m => m.AdminPageModule),
     canActivate: [
      AuthGuard, AdminGuard
     ]
  },
    { path: 'error', loadChildren: () => import('./pages/error-page/error-page.module').then(m => m.ErrorPageModule) },
    { path: '401', loadChildren: () => import('./pages/unauthorized-page/unauthorized-page.module').then(m => m.UnauthorizedPageModule) },
    { path: 'brands', loadChildren: () => import('./pages/brands-page/brands-page.module').then(m => m.BrandsPageModule) },
    { path: 'brand', loadChildren: () => import('./pages/brand-page/brand-page.module').then(m => m.BrandPageModule) },
    { path: 'payment', loadChildren: () => import('./pages/payment-type-page/payment-type-page.module').then(m => m.PaymentTypePageModule),
    canActivate: [
     AuthGuard,
    ] },
    { path: 'payment-confirm', loadChildren: () => import('./pages/payment-confirm-page/payment-confirm-page.module').then(m => m.PaymentConfirmPageModule),
    canActivate: [
     AuthGuard,
    ] },
  { path: 'payment-cancelled', loadChildren: () => import('./pages/payment-cancelled/payment-cancelled.module').then(m => m.PaymentCancelledModule) },
  { path: 'payment-success', loadChildren: () => import('./pages/payment-success/payment-success.module').then(m => m.PaymentSuccessModule) },
    { path: '**', component: HomePageComponent },  // Wildcard route for a 404 page

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabled',
      // scrollPositionRestoration: 'enabled'

    })
  ], // Define Preloading Strategies
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard],

})
export class AppRoutingModule {}
