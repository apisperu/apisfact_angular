import { ICompany } from '../models/company.model';
import { ISimpleCompany } from '../models/simple-company.model';

export class CompanyUtil {
  static buildSimpleCompany(company: ICompany) {
    const simpleCompany: ISimpleCompany = {
      address: {
        direccion: company.direccion,
      },
      razonSocial: company.razon_social,
      ruc: company.ruc,
    };

    return simpleCompany;
  }
}
