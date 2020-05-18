import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/core/services/company.service';
import { ICompany } from 'src/app/core/models/company.model';
import { Store } from '@ngxs/store';
import { CompanyState } from 'src/app/core/store/company.state';
import { Emitter, Emittable } from '@ngxs-labs/emitter';

@Component({
  selector: 'app-layout',
  templateUrl: 'layout.component.html',
})
export class LayoutComponent implements OnInit {
  @Emitter(CompanyState.setActiveCompany)
  private setActiveCompany: Emittable<ICompany>;

  companyList = [];
  activeCompany: ICompany = null;
  constructor(private companyService: CompanyService, private store: Store) {}

  ngOnInit() {
    this.companyService.getList().subscribe((response: ICompany[]) => {
      this.companyList = response;

      const activeCompanyState = this.store.selectSnapshot(
        CompanyState.activeCompany
      );
      if (!activeCompanyState || !activeCompanyState.id) {
        this.activeCompany = response[0];
        this.setActiveCompany.emit(this.activeCompany);
      } else {
        this.activeCompany = activeCompanyState;
      }
    });
  }

  selectCompany(company: ICompany) {
    this.activeCompany = company;
    this.setActiveCompany.emit(this.activeCompany);
    window.location.reload();
  }

  createCompany() {
    console.log('crear empresa');
  }
}
