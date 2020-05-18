import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { EditPresenter } from './edit.presenter';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IProduct } from '../../models/product.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [EditPresenter],
})
export class EditComponent implements OnInit {
  codProducto = '';
  productForm: FormGroup;

  constructor(
    private presenter: EditPresenter,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private vcRef: ViewContainerRef
  ) {
    this.setForm();
    this.presenter.setView(this);
    this.activatedRoute.params.subscribe((data) => {
      this.codProducto = data.id;
      this.presenter.getProduct(this.codProducto);
    });
  }

  ngOnInit(): void {}

  setData(data: IProduct) {
    this.productForm.get('codProducto').setValue(data.codProducto);
    this.productForm.get('descripcion').setValue(data.descripcion);
    this.productForm.get('unidad').setValue(data.unidad);
    this.productForm.get('mtoValorUnitario').setValue(data.mtoValorUnitario);
  }

  setForm() {
    this.productForm = this.fb.group({
      descripcion: [null, []],
      codProducto: [
        {
          value: null,
          disabled: true,
        },
        [],
      ],
      unidad: [null, []],
      mtoValorUnitario: [null, []],
    });
  }

  onSaveButtonTapped() {
    const data: IProduct = this.productForm.getRawValue();
    this.presenter.updateProduct(data);
  }

  onDeleteButtonTapped() {
    this.presenter.deleteProduct(this.codProducto);
  }

  onSuccessSave(result) {
    // this.modalService
    //   .showModal(SimpleModalComponent, {
    //     viewContainerRef: this.vcRef,
    //     fullscreen: false,
    //     context: {
    //       image: 'success',
    //       title: 'Guardado exitoso',
    //       description: 'El producto se guardó correctamente',
    //       buttonText: 'Volver',
    //     },
    //   })
    //   .then((data: any) => {
    //     this.router.back();
    //   });
  }

  onSuccessDelete(result) {
    // this.modalService
    //   .showModal(SimpleModalComponent, {
    //     viewContainerRef: this.vcRef,
    //     fullscreen: false,
    //     context: {
    //       image: 'success',
    //       title: 'Eliminación exitosa',
    //       description: 'El producto se eliminó correctamente',
    //       buttonText: 'Volver',
    //     },
    //   })
    //   .then((data: any) => {
    //     this.router.back();
    //   });
  }
}
