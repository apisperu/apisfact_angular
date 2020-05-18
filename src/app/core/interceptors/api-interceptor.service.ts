import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { LoaderService } from '../services/loader.service';
import { LoginService } from '../services/login.service';
import { Store } from '@ngxs/store';
import { AuthState } from '../store/auth.state';
import { Router } from '@angular/router';

const BASE_URL = 'https://facturacion.apisperu.com/api/v1/';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(
    private loginService: LoginService,
    private store: Store,
    private loaderService: LoaderService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.store.selectSnapshot(AuthState.token);
    this.loaderService.showLoader();
    if (authToken) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${authToken}`),
      });
    }

    request = request.clone({
      url: `${BASE_URL}${request.url}`,
      headers: request.headers.set('Accept', 'application/json'),
    });

    return next.handle(request).pipe(
      catchError((error) => {
        this.handleError(error);
        return throwError(error);
      }),
      finalize(() => {
        this.loaderService.hideLoader();
      })
    );
  }

  private handleError(res: HttpErrorResponse): any {
    if (res.status === 401) {
      this.router.navigate(['login']);
    } else {
      this.loginService.logout();
    }
    return throwError(res.error);
  }
}
