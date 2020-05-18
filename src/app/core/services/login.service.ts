import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Endpoint } from '../utils/endpoint';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}

  auth(data: any): Observable<any> {
    return this.http.post(Endpoint.login(), data);
  }

  logout(): Observable<any> {
    // CLEAN store
    return of();
  }
}
