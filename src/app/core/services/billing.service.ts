import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Store } from '@ngxs/store';
import { IBillingRequest } from '../models/billing.request';
import { IBillingResponse } from '../models/billing.response';
import { Endpoint } from '../utils/endpoint';
import { IBilling } from '../models/billing-extended.model';

declare var android;
const BASE_URL = 'https://facturacion.apisperu.com/api/v1/';

@Injectable()
export class BillingService {
  constructor(private _http: HttpClient, private store: Store) {}

  sendInvoice(data: IBillingRequest): Observable<IBillingResponse> {
    return this._http.post<IBillingResponse>(Endpoint.invoice(), data);
  }

  generatePdf(data: any): Observable<HttpResponse<Blob>> {
    return this._http.post(Endpoint.invoicePdf(), data, {
      observe: 'response',
      responseType: 'blob',
    });
  }

  generateXml(data: IBillingRequest): Observable<HttpResponse<Blob>> {
    return this._http.post(Endpoint.invoiceXml(), data, {
      observe: 'response',
      responseType: 'blob',
    });
  }

  storeBilling(companyRuc: string, data: IBilling): Observable<any> {
    const billingList = this.getBillingList(companyRuc);
    billingList.push(data);
    this.saveBillingList(companyRuc, billingList);
    return of({});
  }

  getList(companyRuc: string): Observable<IBilling[]> {
    const billingList = this.getBillingList(companyRuc);
    return of(billingList);
  }

  private getBillingList(companyRuc: string): IBilling[] {
    // const companyDataStateList: ICompanyDataState[] = getString(
    //   'companyDataStateList'
    // )
    //   ? JSON.parse(getString('companyDataStateList'))
    //   : [];

    // const index = companyDataStateList.findIndex(
    //   (item) => item.company.ruc === companyRuc
    // );

    // return index !== -1 ? companyDataStateList[index].billingList : [];
    return [];
  }

  private saveBillingList(companyRuc: string, billingList: IBilling[]) {
    // const companyDataStateList: ICompanyDataState[] = getString(
    //   'companyDataStateList'
    // )
    //   ? JSON.parse(getString('companyDataStateList'))
    //   : [];
    // const index = companyDataStateList.findIndex(
    //   (item) => item.company.ruc === companyRuc
    // );
    // if (index !== -1) {
    //   companyDataStateList[index].billingList = billingList;
    //   setString('companyDataStateList', JSON.stringify(companyDataStateList));
    // }
  }
}
