export interface IClient {
  id: number;
  tipoDoc: string;
  numDoc: string;
  rznSocial: string;
  direccion: string;
  companyRuc: string;
}

export interface IClientRequest {
  id: number;
  tipoDoc: string;
  numDoc: string;
  rznSocial: string;
  address: {
    direccion: string;
  };
  companyRuc: string;
}
