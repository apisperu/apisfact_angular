import { Injectable } from '@angular/core';

import { NewComponent } from './new.component';
import { IProduct } from 'src/app/core/models/product.model';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { CompanyState } from 'src/app/core/store/company.state';

@Injectable()
export class NewPresenter {
  @Emitter(CompanyState.addProduct)
  private addProduct: Emittable<IProduct>;
  private view: NewComponent;

  constructor() {}

  setView(view: NewComponent) {
    this.view = view;
  }

  saveProduct(data: IProduct) {
    this.addProduct.emit(data);
    this.view.onSuccessSave({});
  }
}
