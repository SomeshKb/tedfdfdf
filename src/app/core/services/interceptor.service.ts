import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.has(InterceptorSkipHeader)) {
      
      const headers = req.headers.delete(InterceptorSkipHeader);
      return next.handle(req.clone({ headers }));

    } else {

      let userData: any = JSON.parse(localStorage.getItem('userData'));
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userData.token,
        }),
      });

      console.log('Intercepted HTTP call', authReq);

      return next.handle(authReq);
    }
  }
}
