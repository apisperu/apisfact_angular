import { Injectable } from '@angular/core';

import { NewComponent } from './new.component';
import { IProduct } from 'src/app/core/models/product.model';
import { CompanyState } from 'src/app/core/store/company.state';
import { ProductService } from 'src/app/core/services/product.service';
import { Store } from '@ngxs/store';

@Injectable()
export class NewPresenter {
  private view: NewComponent;

  constructor(private productService: ProductService, private store: Store) {}

  setView(view: NewComponent) {
    this.view = view;
  }

  saveProduct(data: IProduct) {
    data.companyRuc = this.store.selectSnapshot(CompanyState.activeCompany).ruc;
    this.productService.save(data).subscribe(() => {
      this.view.onSuccessSave({});
    });
  }
}
