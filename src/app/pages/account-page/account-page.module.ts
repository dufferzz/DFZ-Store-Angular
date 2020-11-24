import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountPageRoutingModule } from './account-page-routing.module';
import { AccountPageComponent } from './account-page.component';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { AuthService } from '../../_auth/auth0.service';
import {
  InterceptorService
} from '../../_interceptors/jwt.interceptor';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill'
import {NotificationService} from '../../_services/notifications.service'
@NgModule({
  declarations: [AccountPageComponent],
  imports: [
    CommonModule,
    AccountPageRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    QuillModule.forRoot()


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ErrorInterceptor,
    //   multi: true
    // },
    AuthService,
    NotificationService
    // CartService,
    // InterceptorService

  ],
})
export class AccountPageModule { }
