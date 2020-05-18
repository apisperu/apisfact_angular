import {
  Component,
  OnInit,
  ViewContainerRef,
  Type,
  ViewChild,
  ComponentFactoryResolver,
} from '@angular/core';
import { TicketPresenter } from './ticket.presenter';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ICompany } from 'src/app/core/models/company.model';
import { IClient } from 'src/app/core/models/client.model';
import {
  IBillingDetailRequest,
  IBillingRequest,
} from 'src/app/core/models/billing.request';
import { Router } from '@angular/router';
import { IBillingResponse } from 'src/app/core/models/billing.response';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { IProduct } from 'src/app/core/models/product.model';
import { IProductExtended } from 'src/app/core/models/product-extended.model';

const TIPO_DOC_BOLETA = '03';
const CURRENCY_SOLES = 'PEN';

@Component({
  selector: 'app-billing-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
  providers: [TicketPresenter, DatePipe],
})
export class TicketComponent implements OnInit {
  ticketForm: FormGroup;
  clientList = [];
  productList = [];
  client: IClient = null;
  documentType = TIPO_DOC_BOLETA;
  currency = CURRENCY_SOLES;
  productAddedList = [] as IProductExtended[];
  billingDetail: IBillingDetailRequest[] = [];

  addProductForm: FormGroup;

  @ViewChild('successModalContainer', {
    read: ViewContainerRef,
    static: true,
  })
  successModalContainer: ViewContainerRef;

  constructor(
    private presenter: TicketPresenter,
    private router: Router,
    private fb: FormBuilder,
    private resolver: ComponentFactoryResolver
  ) {
    this.presenter.setView(this);
    this.presenter.getClients();
    this.presenter.getProducts();
    this.setForm();
  }

  ngOnInit(): void {}

  setForm() {
    this.ticketForm = this.fb.group({
      tipoDoc: [TIPO_DOC_BOLETA, []],
      serie: ['B001', []],
      correlativo: ['1', []],
      tipoMoneda: [
        {
          value: this.currency,
          disabled: true,
        },
      ],
      client: [null, []],
    });

    this.addProductForm = this.fb.group({
      product: [null, []],
      cant: [0, []],
    });
  }

  setClientList(clientList) {
    this.clientList = clientList;
  }

  setProductList(productList) {
    this.productList = productList;
  }

  onSaveButtonTapped() {
    this.billingDetail = this.presenter.buildBillingDetailRequest(
      this.productAddedList
    );
    const request: IBillingRequest = this.presenter.buildBillingRequest();
    this.presenter.save(request);
  }

  onSuccessSaved(response: IBillingResponse) {
    this.createModal(response);
  }

  onErrorSaved(response: IBillingResponse) {
    // this.createModal(SimpleModalComponent, {
    //   image: 'error',
    //   title: 'Ocurrió un error',
    //   description: response.sunatResponse.error.message,
    //   buttonText: 'Cerrar',
    // }).then((data) => {});
  }

  // onSelectProduct() {
  //   this.createModal(ProductSelectorModalComponent).then(
  //     (data: IProductExtended[]) => {
  //       if (!data || data.length === 0) return;
  //       this.billingDetail = this.presenter.buildBillingDetailRequest(data);
  //     }
  //   );
  // }

  addProduct() {
    const validation = this.productAddedList.some(
      (item) =>
        item.codProducto ===
        this.addProductForm.get('product').value.codProducto
    );
    if (validation || this.addProductForm.get('cant').value === 0) {
      return;
    }
    this.productAddedList.push({
      active: true,
      cantidad: this.addProductForm.get('cant').value,
      ...(this.addProductForm.get('product').value as IProduct),
    });
    this.addProductForm.get('product').setValue(null);
    this.addProductForm.get('cant').setValue(0);
  }

  createModal(response) {
    this.successModalContainer.clear();
    const factory = this.resolver.resolveComponentFactory(ModalComponent);
    const componentRef = this.successModalContainer.createComponent(factory);
    componentRef.instance.title = 'Envío Exitoso';
    componentRef.instance.description =
      response.sunatResponse.cdrResponse.description;
    componentRef.instance.callback.subscribe(() => {
      this.router.navigate(['facturacion']);
    });
  }
}
