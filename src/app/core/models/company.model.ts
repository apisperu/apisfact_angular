export interface ICompany {
  id: number;
  sol_user: string;
  sol_pass: string;
  ruc: string;
  razon_social: string;
  direccion: string;
  certificado: string;
  logo: string;
}

export class Company {
  id = 0;
  sol_user = '';
  sol_pass = '';
  ruc = '';
  razon_social = '';
  direccion = '';
  certificado = '';
  logo = '';

  constructor(obj?: ICompany) {
    if (obj) {
      this.id = obj.id || this.id;
      this.sol_user = obj.sol_user || this.sol_user;
      this.sol_pass = obj.sol_pass || this.sol_pass;
      this.ruc = obj.ruc || this.ruc;
      this.razon_social = obj.razon_social || this.razon_social;
      this.direccion = obj.direccion || this.direccion;
      this.certificado = obj.certificado || this.certificado;
      this.logo = obj.logo || this.logo;
    }
  }
}
