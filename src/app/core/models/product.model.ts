export interface IProduct {
  codProducto: string;
  unidad: string;
  descripcion: string;
  mtoValorUnitario: number;
}

export class Product {
  codProducto = '';
  unidad = '';
  descripcion = '';
  mtoValorUnitario = 0;

  constructor(obj?: IProduct) {
    if (obj) {
      this.codProducto = obj.codProducto || this.codProducto;
      this.unidad = obj.unidad || this.unidad;
      this.descripcion = obj.descripcion || this.descripcion;
      this.mtoValorUnitario = obj.mtoValorUnitario || this.mtoValorUnitario;
    }
  }
}
