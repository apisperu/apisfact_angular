import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IClient } from '../models/client.model';
import { Endpoint } from '../utils/endpoint';

export interface IItem {
  code: string;
  value: string;
}

@Injectable()
export class ClientService {
  constructor(private http: HttpClient) {}

  getList(companyRuc: string): Observable<IClient[]> {
    return this.http.get<IClient[]>(Endpoint.clients(), {
      params: {
        companyRuc,
      },
    });
  }

  getById(id: number): Observable<IClient> {
    return this.http.get<IClient>(`${Endpoint.clients()}/${id}`);
  }

  save(data: IClient): Observable<any> {
    return this.http.post(Endpoint.clients(), data);
  }

  update(data: IClient): Observable<any> {
    return this.http.put(`${Endpoint.clients()}/${data.id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${Endpoint.clients()}/${id}`);
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
}
