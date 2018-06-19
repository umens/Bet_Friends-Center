import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authenticationService.credentials != null && this.authenticationService.credentials.token != null) {
      request = request.clone({
        setHeaders: {
          Authorization: `${this.authenticationService.credentials.token}`
        }
      });
    }

    return next.handle(request);
  }
}
