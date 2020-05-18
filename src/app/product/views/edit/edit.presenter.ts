import { Injectable } from '@angular/core';

import { EditComponent } from './edit.component';
import { IProduct } from '../../models/product.model';
import { ICompany } from 'src/app/core/models/company.model';
import { ProductService } from 'src/app/core/services/product.service';
import { CompanyService } from 'src/app/core/services/company.service';

@Injectable()
export class EditPresenter {
  private view: EditComponent;
  private activeCompany = {} as ICompany;

  constructor(
    private productService: ProductService,
    private companyService: CompanyService
  ) {
    this.companyService.getActiveCompany().subscribe((data) => {
      this.activeCompany = data;
    });
  }

  setView(view: EditComponent) {
    this.view = view;
  }

  updateProduct(data: IProduct) {
    this.productService
      .update(this.activeCompany.ruc, data)
      .subscribe((response) => {
        this.view.onSuccessSave(response);
      });
  }

  deleteProduct(codProduct) {
    this.productService
      .delete(this.activeCompany.ruc, codProduct)
      .subscribe((response) => {
        this.view.onSuccessDelete(response);
      });
  }

  getProduct(codProduct: any) {
    this.productService
      .getByCode(this.activeCompany.ruc, codProduct)
      .subscribe((data) => {
        this.view.setData(data);
      });
  }
}
