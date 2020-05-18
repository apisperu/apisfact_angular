import { Component, OnInit } from '@angular/core';
import { ListPresenter } from './list.presenter';
import { Router } from '@angular/router';
import { IClient } from 'src/app/core/models/client.model';

@Component({
  selector: 'app-client-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ListPresenter],
})
export class ListComponent implements OnInit {
  clientList = [] as IClient[];

  constructor(private presenter: ListPresenter, private router: Router) {
    this.presenter.setView(this);
  }

  ngOnInit(): void {
    this.presenter.getClientList();
  }

  setClientList(clientList) {
    this.clientList = clientList;
  }

  onAddButtonTapped() {
    this.router.navigate(['clientes/nuevo']);
  }
}
