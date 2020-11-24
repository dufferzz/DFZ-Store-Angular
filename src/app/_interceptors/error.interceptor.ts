import {
  Injectable
} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse

} from '@angular/common/http';
import {
  Observable,
  throwError
} from 'rxjs';

import {
  HttpHeaders
} from '@angular/common/http';
export const InterceptorSkip = 'X-Skip-Interceptor';
export const InterceptorSkipHeader = new HttpHeaders({
  'X-Skip-Interceptor': ''
});

import { retry, catchError } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {

    // If request headers have InterceptorSkip header, bypass addni
    if (request.headers && request.headers.has(InterceptorSkip)) {
      const headers = request.headers.delete(InterceptorSkip);
      return next.handle(request.clone({
        headers
      }));
    }

   // auto retry on network access fail
    return next.handle(request)
    // .pipe(
    //   //retry n times
    //   retry(1),
    //   catchError((error: HttpErrorResponse) => {
    //     let errorMessage = '';
    //     // console.log(error)
    //     if (error.error instanceof ErrorEvent) {
    //       if(error.statusText=='Unknown Error') {
    //         errorMessage = `Unable to connect to API`;
    //       } else{
    //         errorMessage = `${error.statusText}`;
    //       }
    //       // client-side error
    //       // errorMessage = `Error: ${error.statusText}`;
    //     } else {
    //       // server-side error
    //       if(error.statusText=='Unknown Error') {
    //         errorMessage = `Unable to connect to API`;
    //       } else{
    //         errorMessage = `${error.statusText}`;
    //       }
    //     }
    //     // window.alert(errorMessage);
    //     return throwError(errorMessage);
    //   })
    // )
  }
}
