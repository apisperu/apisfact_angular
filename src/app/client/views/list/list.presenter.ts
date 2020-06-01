import { Injectable } from '@angular/core';

import { ListComponent } from './list.component';
import { Store } from '@ngxs/store';
import { CompanyState } from 'src/app/core/store/company.state';
import { ClientService } from 'src/app/core/services/client.service';

@Injectable()
export class ListPresenter {
  private view: ListComponent;

  constructor(private store: Store, private clientService: ClientService) {}

  setView(view: ListComponent) {
    this.view = view;
  }

  getClientList() {
    const activeCompany = this.store.selectSnapshot(CompanyState.activeCompany);
    this.clientService.getList(activeCompany.ruc).subscribe((data) => {
      console.log({ data });
      this.view.setClientList(data);
    });
  }
}
