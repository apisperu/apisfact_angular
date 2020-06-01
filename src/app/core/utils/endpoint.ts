const APISFACT_URL = 'https://facturacion.apisperu.com/api/v1';
const BACKEND_URL = 'http://localhost:8000/api';
export class Endpoint {
  static login() {
    return `${APISFACT_URL}/auth/login`;
  }
  static company() {
    return `${APISFACT_URL}/companies`;
  }
  static invoice() {
    return `${APISFACT_URL}/invoice/send`;
  }
  static invoicePdf() {
    return `${APISFACT_URL}/invoice/pdf`;
  }
  static invoiceXml() {
    return `${APISFACT_URL}/invoice/xml`;
  }
  static clients() {
    return `${BACKEND_URL}/clients`;
  }
  static products() {
    return `${BACKEND_URL}/products`;
  }
  static sales() {
    return `${BACKEND_URL}/sales`;
  }
}
