import {
  Injectable
} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {
  AuthService
} from '../_auth/auth0.service';
import {
  Observable,
  throwError
} from 'rxjs';
import {
  mergeMap,
  catchError
} from 'rxjs/operators';

import {
  HttpHeaders
} from '@angular/common/http';
export const InterceptorSkip = 'X-Skip-Interceptor';
export const InterceptorSkipHeader = new HttpHeaders({
  'X-Skip-Interceptor': ''
});

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest < any > ,
    next: HttpHandler
  ): Observable < HttpEvent < any >> {
    if (req.headers && req.headers.has(InterceptorSkip)) {
      const headers = req.headers.delete(InterceptorSkip);
      return next.handle(req.clone({
        headers
      }));
    } else {
      return this.auth.getTokenSilently$().pipe(
        mergeMap(token => {
          const tokenReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next.handle(tokenReq);
        }),
        catchError(err => throwError(err))
      );
    }
  }

}
