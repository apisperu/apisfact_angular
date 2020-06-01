import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product.model';
import { Endpoint } from '../utils/endpoint';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  getList(companyRuc: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(Endpoint.products(), {
      params: {
        companyRuc,
      },
    });
  }

  save(data: IProduct): Observable<any> {
    return this.http.post(Endpoint.products(), data);
  }

  update(data: IProduct): Observable<any> {
    return this.http.put(`${Endpoint.products}/${data.id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${Endpoint.products}/${id}`);
  }

  getById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${Endpoint.products}/${id}`);
  }
}
