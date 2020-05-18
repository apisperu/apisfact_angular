import { Component, OnInit } from '@angular/core';
import { ListPresenter } from './list.presenter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ListPresenter],
})
export class ListComponent implements OnInit {
  productList = [];

  constructor(private presenter: ListPresenter, private router: Router) {
    this.presenter.setView(this);
  }

  ngOnInit(): void {
    this.presenter.getProductList();
  }

  setProductList(productList) {
    this.productList = productList;
  }

  onAddButtonTapped() {
    this.router.navigate(['productos/nuevo']);
  }
}
