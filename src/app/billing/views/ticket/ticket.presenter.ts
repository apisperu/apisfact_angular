import { Injectable } from '@angular/core';

import { TicketComponent } from './ticket.component';

import { DatePipe } from '@angular/common';
import { BillingService } from 'src/app/core/services/billing.service';
import { CompanyService } from 'src/app/core/services/company.service';
import {
  IBillingRequest,
  IBillingDetailRequest,
} from 'src/app/core/models/billing.request';
import { IBillingResponse } from 'src/app/core/models/billing.response';
import { ICompany } from 'src/app/core/models/company.model';
import { CompanyUtil } from 'src/app/core/utils/company.util';
import { NumberUtil } from 'src/app/core/utils/number.util';
import { IProductExtended } from 'src/app/core/models/product-extended.model';
import { IBilling } from 'src/app/core/models/billing-extended.model';
import { Store } from '@ngxs/store';
import { CompanyState } from 'src/app/core/store/company.state';
import { EventEmitter } from 'events';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { ProductService } from 'src/app/core/services/product.service';
import { ClientService } from 'src/app/core/services/client.service';
import { IClient } from 'src/app/core/models/client.model';

const UBL_VERSION = '2.1';
const IGV_PERCENTAGE = 18;
const TIPO_AFECT_IGV = 10;

@Injectable()
export class TicketPresenter {
  @Emitter(CompanyState.addBilling)
  private addBilling: Emittable<IBilling>;
  private view: TicketComponent;
  company: ICompany = null;

  constructor(
    private billingService: BillingService,
    private datePipe: DatePipe,
    private store: Store,
    private productService: ProductService,
    private clientService: ClientService
  ) {
    this.company = this.store.selectSnapshot(CompanyState.activeCompany);
  }

  setView(view: TicketComponent) {
    this.view = view;
  }

  getClients() {
    this.clientService.getList(this.company.ruc).subscribe((data) => {
      this.view.setClientList(data);
    });
  }

  getProducts() {
    this.productService.getList(this.company.ruc).subscribe((data) => {
      this.view.setProductList(data);
    });
  }

  save(data: IBillingRequest) {
    this.billingService
      .sendInvoice(data)
      .subscribe((response: IBillingResponse) => {
        if (response.sunatResponse.success) {
          this.storeBilling(data, response);
        } else {
          this.view.onErrorSaved(response);
        }
      });
  }

  buildBillingRequest() {
    const client: IClient = (this.view.ticketForm.value || {}).client;
    const data: IBillingRequest = this.view.ticketForm.value;
    data.fechaEmision = this.datePipe.transform(
      Date.now(),
      'yyyy-MM-ddTHH:mm:ssZZZZZ'
    );
    data.tipoDoc = this.view.documentType;
    data.tipoOperacion = '0101';
    data.company = CompanyUtil.buildSimpleCompany(this.company);
    data.client = {
      ...data.client,
      address: {
        direccion: client.direccion,
      },
    };
    data.tipoMoneda = this.view.currency;
    data.details = this.view.billingDetail;
    data.mtoOperGravadas = this.view.billingDetail.reduce((acc, value) => {
      return acc + value.mtoBaseIgv;
    }, 0);
    data.mtoIGV = this.view.billingDetail.reduce((acc, value) => {
      return acc + value.igv;
    }, 0);
    data.totalImpuestos = this.view.billingDetail.reduce((acc, value) => {
      return acc + value.totalImpuestos;
    }, 0);
    data.valorVenta = this.view.billingDetail.reduce((acc, value) => {
      return acc + value.mtoValorVenta;
    }, 0);
    data.mtoImpVenta = this.view.billingDetail.reduce((acc, value) => {
      return acc + value.mtoValorVenta + value.totalImpuestos;
    }, 0);
    data.ublVersion = UBL_VERSION;
    data.legends = [
      {
        code: '1000',
        value: NumberUtil.buildLegend(data.mtoImpVenta),
      },
    ];
    return data;
  }

  buildBillingDetailRequest(productExtendedList: IProductExtended[]) {
    return productExtendedList.map((item) => {
      const subTotal = parseFloat(`${item.mtoValorUnitario}`) * item.cantidad;
      const totalIgv = (subTotal * IGV_PERCENTAGE) / 100;
      return {
        cantidad: item.cantidad,
        codProducto: item.codProducto,
        descripcion: item.descripcion,
        mtoValorUnitario: item.mtoValorUnitario,
        unidad: item.unidad,
        mtoValorVenta: subTotal,
        mtoBaseIgv: subTotal,
        porcentajeIgv: IGV_PERCENTAGE,
        igv: totalIgv,
        tipAfeIgv: TIPO_AFECT_IGV,
        totalImpuestos: totalIgv,
        mtoPrecioUnitario:
          (parseFloat(`${item.mtoValorUnitario}`) + totalIgv) / item.cantidad,
      } as IBillingDetailRequest;
    });
  }

  private storeBilling(request: IBillingRequest, response: IBillingResponse) {
    const billing = {
      ...request,
      sunatResponse: response.sunatResponse,
    } as IBilling;

    this.billingService.storeBilling(billing).subscribe(() => {
      this.view.onSuccessSaved(response);
    });
  }
}
