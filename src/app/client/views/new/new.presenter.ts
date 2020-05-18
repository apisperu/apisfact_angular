import { Injectable } from '@angular/core';

import { NewComponent } from './new.component';
import { IClient } from 'src/app/core/models/client.model';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { CompanyState } from 'src/app/core/store/company.state';

@Injectable()
export class NewPresenter {
  @Emitter(CompanyState.addClient)
  private addClient: Emittable<IClient>;
  private view: NewComponent;

  constructor() {}

  setView(view: NewComponent) {
    this.view = view;
  }

  saveClient(data: IClient) {
    this.addClient.emit(data);
    this.view.onSuccessSave();
  }
}
