import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { IBillingRequest } from '../models/billing.request';
import { IBillingResponse } from '../models/billing.response';
import { Endpoint } from '../utils/endpoint';
import { IBilling } from '../models/billing-extended.model';

@Injectable()
export class BillingService {
  constructor(private http: HttpClient, private store: Store) {}

  sendInvoice(data: IBillingRequest): Observable<IBillingResponse> {
    return this.http.post<IBillingResponse>(Endpoint.invoice(), data);
  }

  generatePdf(data: any): Observable<HttpResponse<Blob>> {
    return this.http.post(Endpoint.invoicePdf(), data, {
      observe: 'response',
      responseType: 'blob',
    });
  }

  generateXml(data: IBillingRequest): Observable<HttpResponse<Blob>> {
    return this.http.post(Endpoint.invoiceXml(), data, {
      observe: 'response',
      responseType: 'blob',
    });
  }

  storeBilling(data: IBilling): Observable<any> {
    return this.http.post(Endpoint.sales(), data);
  }

  getList(companyRuc: string): Observable<IBilling[]> {
    return this.http.get<IBilling[]>(`${Endpoint.sales()}`, {
      params: {
        companyRuc,
      },
    });
  }
}
