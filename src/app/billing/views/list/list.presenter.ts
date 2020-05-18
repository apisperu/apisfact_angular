import { Injectable } from '@angular/core';
import { ListComponent } from './list.component';
import { Store } from '@ngxs/store';
import { CompanyState } from 'src/app/core/store/company.state';
import { IBilling } from 'src/app/core/models/billing-extended.model';
import { BillingService } from 'src/app/core/services/billing.service';

@Injectable()
export class ListPresenter {
  private view: ListComponent;

  constructor(private store: Store, private billingService: BillingService) {}

  setView(view: ListComponent) {
    this.view = view;
  }

  getBillingList() {
    this.view.setBillingList(
      this.store.selectSnapshot(CompanyState.billingList)
    );
  }

  generatePdf(item: IBilling) {
    const request = {
      ...item,
    };
    delete request.sunatResponse;
    this.billingService.generatePdf(request).subscribe(
      (response) => {
        const file = new File([response.body], 'test.pdf', {
          type: 'application/pdf',
        });
        const fileURL = window.URL.createObjectURL(file);
        window.open(fileURL);
      },
      (err) => {
        console.log('ERROR');
        console.log({ err });
      }
    );
  }

  generateXml(item: IBilling) {
    const request = {
      ...item,
    };
    delete request.sunatResponse;
    this.billingService.generateXml(request).subscribe(
      (response) => {
        const file = new File([response.body], 'test.xml', {
          type: 'text/xml',
        });
        const fileURL = window.URL.createObjectURL(file);
        window.open(fileURL);
      },
      (err) => {
        console.log('ERROR');
        console.log({ err });
      }
    );
  }
}
