import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loader$: Observable<boolean>;

  loaderSubject = new Subject<boolean>();

  constructor(protected httpClient: HttpClient) {
    this.loader$ = this.loaderSubject.asObservable();
  }

  showLoader() {
    this.loaderSubject.next(true);
  }

  hideLoader() {
    this.loaderSubject.next(false);
  }
}
