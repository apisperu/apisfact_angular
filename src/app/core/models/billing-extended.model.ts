import { IBillingRequest } from './billing.request';
import { ISunatResponse } from './billing.response';

export interface IBilling extends IBillingRequest {
  sunatResponse: ISunatResponse;
}
