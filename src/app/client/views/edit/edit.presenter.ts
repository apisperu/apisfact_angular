import { Injectable } from '@angular/core';

import { EditComponent } from './edit.component';
import { ICompany } from 'src/app/core/models/company.model';
import { ClientService, IItem } from 'src/app/core/services/client.service';
import { CompanyService } from 'src/app/core/services/company.service';
import { IClient } from 'src/app/core/models/client.model';

@Injectable()
export class EditPresenter {
  private view: EditComponent;
  private activeCompany = {} as ICompany;

  constructor(
    private clientService: ClientService,
    private companyService: CompanyService
  ) {
    this.companyService.getActiveCompany().subscribe((data) => {
      this.activeCompany = data;
    });
  }

  setView(view: EditComponent) {
    this.view = view;
  }

  updateClient(data: IClient) {
    this.clientService.update(this.activeCompany.ruc, data).subscribe(() => {
      this.view.onSuccessSave();
    });
  }

  deleteClient(docNumber) {
    this.clientService
      .delete(this.activeCompany.ruc, docNumber)
      .subscribe(() => {
        this.view.onSuccessDelete();
      });
  }

  getClient(docNumber: string) {
    this.clientService
      .getByDocNumner(this.activeCompany.ruc, docNumber)
      .subscribe((data) => {
        this.view.setData(data);
      });
  }

  getPersonalDocumentTypeList() {
    this.clientService
      .getPersonalDocumentTypeList()
      .subscribe((data: IItem[]) => {
        this.view.setDocumentTypeList(data);
      });
  }
}
