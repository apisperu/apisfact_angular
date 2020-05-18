export interface IProductExtended {
  codProducto: string;
  unidad: string;
  descripcion: string;
  mtoValorUnitario: number;
  active: boolean;
  cantidad: number;
}

export class ProductExtended {
  codProducto = '';
  unidad = '';
  descripcion = '';
  mtoValorUnitario = 0;
  active = false;
  cantidad = 0;

  constructor(obj?: IProductExtended) {
    if (obj) {
      this.codProducto = obj.codProducto || this.codProducto;
      this.unidad = obj.unidad || this.unidad;
      this.descripcion = obj.descripcion || this.descripcion;
      this.mtoValorUnitario = obj.mtoValorUnitario || this.mtoValorUnitario;
      this.active = obj.active || this.active;
      this.cantidad = obj.cantidad || this.cantidad;
    }
  }
}
