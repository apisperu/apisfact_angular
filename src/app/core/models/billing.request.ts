import { IClient, IClientRequest } from './client.model';
import { ISimpleCompany } from './simple-company.model';

export interface IBillingRequest {
  tipoOperacion: string;
  tipoDoc: string;
  serie: string;
  correlativo: string;
  fechaEmision: string;
  tipoMoneda: string;
  client: IClientRequest;
  company: ISimpleCompany;
  mtoOperGravadas: number;
  mtoIGV: number;
  totalImpuestos: number;
  valorVenta: number;
  mtoImpVenta: number;
  ublVersion: string;
  details: IBillingDetailRequest[];
  legends: IBillingLegendRequest[];
}

export interface IBillingDetailRequest {
  codProducto: string;
  unidad: string;
  descripcion: string;
  cantidad: number;
  mtoValorUnitario: number;
  mtoValorVenta: number;
  mtoBaseIgv: number;
  porcentajeIgv: number;
  igv: number;
  tipAfeIgv: number;
  totalImpuestos: number;
  mtoPrecioUnitario: number;
}

export interface IBillingLegendRequest {
  code: string;
  value: string;
}
