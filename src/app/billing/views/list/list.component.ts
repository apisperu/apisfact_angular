import { Component, OnInit } from '@angular/core';
import { ListPresenter } from './list.presenter';
import { IBilling } from 'src/app/core/models/billing-extended.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billing-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ListPresenter],
})
export class ListComponent implements OnInit {
  billingList = [] as IBilling[];

  constructor(private presenter: ListPresenter, private router: Router) {
    this.presenter.setView(this);
  }

  ngOnInit(): void {
    this.presenter.getBillingList();
  }

  setBillingList(billingList) {
    this.billingList = billingList;
  }

  generatePdf(item: IBilling) {
    this.presenter.generatePdf(item);
  }

  generateXml(item: IBilling) {
    this.presenter.generateXml(item);
  }
}
