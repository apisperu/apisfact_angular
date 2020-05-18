export interface IBillingResponse {
  xml: string;
  hash: string;
  sunatResponse: ISunatResponse;
}

export interface ISunatResponse {
  success: boolean;
  error: IErrorResponse;
  cdrZip: string;
  cdrResponse: ICDRResponse;
}

export interface ICDRResponse {
  accepted: boolean;
  id: string;
  code: string;
  description: string;
  notes: string[];
}

export interface IErrorResponse {
  code: string;
  message: string;
}
