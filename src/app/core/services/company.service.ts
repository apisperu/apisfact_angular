import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Endpoint } from '../utils/endpoint';
import { ICompany } from '../models/company.model';

@Injectable()
export class CompanyService {
  constructor(private _http: HttpClient) {}

  getList(): Observable<any> {
    return this._http.get(Endpoint.company());
  }

  save(data): Observable<any> {
    return this._http.post(Endpoint.company(), data);
  }

  getActiveCompany(): Observable<ICompany> {
    // const companyDataStateList: ICompanyDataState[] = getString(
    //   'companyDataStateList'
    // )
    //   ? JSON.parse(getString('companyDataStateList'))
    //   : [];

    // const index = companyDataStateList.findIndex((item) => item.active);

    // return index !== -1 ? of(companyDataStateList[index].company) : of(null);
    return null;
  }

  storeActiveCompany(data: ICompany) {
    // const companyDataStateList: ICompanyDataState[] = getString(
    //   'companyDataStateList'
    // )
    //   ? JSON.parse(getString('companyDataStateList'))
    //   : [];
    // const index = companyDataStateList.findIndex(
    //   (item) => item.company.ruc === data.ruc
    // );
    // companyDataStateList.forEach((item) => (item.active = false));
    // if (index !== -1) {
    //   companyDataStateList[index].active = true;
    //   companyDataStateList[index].company = data;
    // } else {
    //   const newItem: ICompanyDataState = {
    //     active: true,
    //     company: data,
    //     billingList: [],
    //     clientList: [],
    //     productList: [],
    //   };
    //   companyDataStateList.push(newItem);
    // }
    // setString('companyDataStateList', JSON.stringify(companyDataStateList));
  }
}
