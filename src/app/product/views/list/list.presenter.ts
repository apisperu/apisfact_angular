import { Injectable } from '@angular/core';

import { ListComponent } from './list.component';
import { Store } from '@ngxs/store';
import { CompanyState } from 'src/app/core/store/company.state';
import { ProductService } from 'src/app/core/services/product.service';

@Injectable()
export class ListPresenter {
  private view: ListComponent;

  constructor(private store: Store, private productService: ProductService) {}

  setView(view: ListComponent) {
    this.view = view;
  }

  getProductList() {
    const companyRuc = this.store.selectSnapshot(CompanyState.activeCompany)
      .ruc;
    this.productService.getList(companyRuc).subscribe((data) => {
      this.view.setProductList(data);
    });
  }
}
