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
    private store: Store
  ) {
    this.company = this.store.selectSnapshot(CompanyState.activeCompany);
  }

  setView(view: TicketComponent) {
    this.view = view;
  }

  getClients() {
    this.view.setClientList(this.store.selectSnapshot(CompanyState.clientList));
  }

  getProducts() {
    this.view.setProductList(
      this.store.selectSnapshot(CompanyState.productList)
    );
  }

  save(data: IBillingRequest) {
    this.billingService
      .sendInvoice(data)
      .subscribe((response: IBillingResponse) => {
        if (response.sunatResponse.success) {
          this.storeBilling(data, response);
          this.view.onSuccessSaved(response);
        } else {
          this.view.onErrorSaved(response);
        }
      });
  }

  buildBillingRequest() {
    const data: IBillingRequest = this.view.ticketForm.value;
    data.fechaEmision = this.datePipe.transform(
      Date.now(),
      'yyyy-MM-ddTHH:mm:ssZZZZZ'
    );
    data.tipoDoc = this.view.documentType;
    data.tipoOperacion = '0101';
    data.company = CompanyUtil.buildSimpleCompany(this.company);
    // data.client = this.view.client;
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
      const subTotal = item.mtoValorUnitario * item.cantidad;
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
        mtoPrecioUnitario: item.mtoValorUnitario + totalIgv / item.cantidad,
      } as IBillingDetailRequest;
    });
  }

  private storeBilling(request: IBillingRequest, response: IBillingResponse) {
    const billing = {
      ...request,
      sunatResponse: response.sunatResponse,
    } as IBilling;

    this.addBilling.emit(billing);
  }
}
