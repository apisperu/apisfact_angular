import { Injectable } from '@angular/core';

import { NewComponent } from './new.component';
import { IClient } from 'src/app/core/models/client.model';
import { CompanyState } from 'src/app/core/store/company.state';
import { ClientService } from 'src/app/core/services/client.service';
import { Store } from '@ngxs/store';

@Injectable()
export class NewPresenter {
  private view: NewComponent;

  constructor(private clientService: ClientService, private store: Store) {}

  setView(view: NewComponent) {
    this.view = view;
  }

  saveClient(data: IClient) {
    data.companyRuc = this.store.selectSnapshot(CompanyState.activeCompany).ruc;
    this.clientService.save(data).subscribe(() => {
      this.view.onSuccessSave();
    });
  }
}
