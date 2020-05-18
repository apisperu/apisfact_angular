import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IClient } from '../models/client.model';

export interface IItem {
  code: string;
  value: string;
}

@Injectable()
export class ClientService {
  constructor(private _http: HttpClient) {}

  getList(companyRuc: string): Observable<IClient[]> {
    const clientList = this.getClientList(companyRuc);
    return of(clientList);
  }

  getByDocNumner(companyRuc: string, numDoc: string): Observable<IClient> {
    const clientList = this.getClientList(companyRuc);
    return of(clientList.find((item) => item.numDoc === numDoc));
  }

  save(companyRuc: string, data: IClient): Observable<any> {
    const clientList = this.getClientList(companyRuc);
    clientList.push(data);
    this.saveClientList(companyRuc, clientList);
    return of({});
  }

  update(companyRuc: string, data: IClient): Observable<any> {
    const clientList = this.getClientList(companyRuc);
    const newClientList = clientList.map((item) => {
      if (item.numDoc === data.numDoc) {
        item = data;
      }
      return {
        ...item,
      };
    });
    this.saveClientList(companyRuc, newClientList);
    return of({});
  }

  delete(companyRuc: string, numDoc: string): Observable<any> {
    const clientList = this.getClientList(companyRuc);
    const newClientList = clientList.filter((item) => {
      return item.numDoc !== numDoc;
    });
    this.saveClientList(companyRuc, newClientList);
    return of({});
  }

  getPersonalDocumentTypeList(): Observable<IItem[]> {
    const list: IItem[] = [
      {
        code: '1',
        value: 'DNI',
      },
      {
        code: '6',
        value: 'RUC',
      },
    ];
    return of(list);
  }

  private getClientList(companyRuc: string): IClient[] {
    // const companyDataStateList: ICompanyDataState[] = getString(
    //   'companyDataStateList'
    // )
    //   ? JSON.parse(getString('companyDataStateList'))
    //   : [];

    // const index = companyDataStateList.findIndex(
    //   (item) => item.company.ruc === companyRuc
    // );

    // return index !== -1 ? companyDataStateList[index].clientList : [];
    return [];
  }

  private saveClientList(companyRuc: string, clientList: IClient[]) {
    // const companyDataStateList: ICompanyDataState[] = getString(
    //   'companyDataStateList'
    // )
    //   ? JSON.parse(getString('companyDataStateList'))
    //   : [];
    // const index = companyDataStateList.findIndex(
    //   (item) => item.company.ruc === companyRuc
    // );
    // if (index !== -1) {
    //   companyDataStateList[index].clientList = clientList;
    //   setString('companyDataStateList', JSON.stringify(companyDataStateList));
    // }
  }
}
