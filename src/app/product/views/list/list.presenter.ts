import { Injectable } from '@angular/core';

import { ListComponent } from './list.component';
import { Store } from '@ngxs/store';
import { CompanyState } from 'src/app/core/store/company.state';

@Injectable()
export class ListPresenter {
  private view: ListComponent;

  constructor(private store: Store) {}

  setView(view: ListComponent) {
    this.view = view;
  }

  getProductList() {
    const test = this.store.selectSnapshot(CompanyState.productList);
    console.log({ test });
    this.view.setProductList(
      this.store.selectSnapshot(CompanyState.productList)
    );
  }
}
