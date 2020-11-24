import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  FormsModule
} from '@angular/forms';
import {
  ReactiveFormsModule
} from '@angular/forms';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {
  InterceptorService
} from './_interceptors/jwt.interceptor';
import {
  ErrorInterceptor
} from './_interceptors/error.interceptor'
import {
  FontAwesomeModule
} from '@fortawesome/angular-fontawesome';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment'

import { CartService } from './_services/cart.service'
import { AuthService } from './_auth/auth0.service';
import { CallbackComponent } from './callback/callback.component';
import { QuillModule } from 'ngx-quill'
import {NotificationService} from './_services/notifications.service'

import { ToastrModule } from 'ngx-toastr';
import { NgxStripeModule } from 'ngx-stripe';
import { CookieModule } from 'ngx-cookie';
import { ModalComponent } from './modal/modal.component';
// import * as io from 'socket.io-client';

// const config: SocketIoConfig = { url: 'https://api.dufferz.net/socket', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    MenuComponent,
    CallbackComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CookieModule.forRoot(),
    // io,
    // SocketIoModule.forRoot(config),
    QuillModule.forRoot({
      modules: {
        toolbar: '#toolbar'
      },
    }),
    ToastrModule.forRoot(
      {
        disableTimeOut:true,
        toastClass: 'toast-bottom-center',
        closeButton: true,
        preventDuplicates: true,

      }
    ),
    NgxStripeModule.forRoot('pk_test_51HDS4OH0CNGkxGJNVQpNJkVyTQ53F33RQdzFPeev25M9hJVZOFyiTMgyhcVwQr7AvmjCb668ReMjGGhgfdaoK2rD00t6hIv2P9'),
    NgbModule,
StorageServiceModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],exports:[
    CommonModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    AuthService,
    CartService,
    NotificationService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
