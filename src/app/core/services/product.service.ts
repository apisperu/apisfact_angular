import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IProduct } from '../models/product.model';

@Injectable()
export class ProductService {
  constructor(private _http: HttpClient) {}

  getList(companyRuc: string): Observable<IProduct[]> {
    const productList = this.getProductList(companyRuc);
    return of(productList);
  }

  save(companyRuc: string, data: IProduct): Observable<any> {
    const productList = this.getProductList(companyRuc);
    productList.push(data);
    this.saveProductList(companyRuc, productList);
    return of({});
  }

  update(companyRuc: string, data: IProduct): Observable<any> {
    const productList = this.getProductList(companyRuc);
    const newProductList = productList.map((item) => {
      if (item.codProducto === data.codProducto) {
        item = data;
      }
      return {
        ...item,
      };
    });
    this.saveProductList(companyRuc, newProductList);
    return of({});
  }

  delete(companyRuc: string, codProducto: string): Observable<any> {
    const productList = this.getProductList(companyRuc);
    const newProductList = productList.filter((item) => {
      return item.codProducto !== codProducto;
    });
    this.saveProductList(companyRuc, newProductList);
    return of({});
  }

  getByCode(companyRuc: string, codProducto: string): Observable<any> {
    const productList: IProduct[] = this.getProductList(companyRuc);
    return of(productList.find((item) => item.codProducto === codProducto));
  }

  private getProductList(companyRuc: string): any[] {
    // const companyDataStateList: ICompanyDataState[] = getString(
    //   'companyDataStateList'
    // )
    //   ? JSON.parse(getString('companyDataStateList'))
    //   : [];

    // const index = companyDataStateList.findIndex(
    //   (item) => item.company.ruc === companyRuc
    // );

    // return index !== -1 ? companyDataStateList[index].productList : [];
    return [];
  }

  private saveProductList(companyRuc: string, productList: IProduct[]) {
    // const companyDataStateList: ICompanyDataState[] = getString(
    //   'companyDataStateList'
    // )
    //   ? JSON.parse(getString('companyDataStateList'))
    //   : [];
    // const index = companyDataStateList.findIndex(
    //   (item) => item.company.ruc === companyRuc
    // );
    // if (index !== -1) {
    //   companyDataStateList[index].productList = productList;
    //   setString('companyDataStateList', JSON.stringify(companyDataStateList));
    // }
  }
}
