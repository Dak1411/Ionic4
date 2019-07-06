import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ApplicationConstant } from '../utils/application-constants';
import { map, catchError } from 'rxjs/operators';
import { GenericService } from '../providers/generic.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private genericServices: GenericService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.genericServices.isOnline()) {
      console.log('isOnline?', navigator.onLine);
      request = request.clone({
        setHeaders: {
          'Content-Type': ApplicationConstant.CONTENT_TYPE_JSON
        }
      });
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          let data = {};
          data = {
            error: error && error.error.reason ? error.error.reason : ApplicationConstant.SOMETHING_WRONG,
            status: error.status
          };
          console.log('InCatch Error:', data);
          return throwError(data);
        }));
    } else {
      return throwError(new HttpErrorResponse({ error: ApplicationConstant.NO_NETWORK }));
    }
  }
}
