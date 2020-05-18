export class Endpoint {
  static login() {
    return `auth/login`;
  }
  static company() {
    return `companies`;
  }
  static invoice() {
    return `invoice/send`;
  }
  static invoicePdf() {
    return `invoice/pdf`;
  }
  static invoiceXml() {
    return `invoice/xml`;
  }
}
