import {
  Component,
  OnInit,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver,
} from '@angular/core';
import { NewPresenter } from './new.presenter';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IProduct } from '../../models/product.model';
import { Router } from '@angular/router';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-product-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
  providers: [NewPresenter],
})
export class NewComponent implements OnInit {
  productForm: FormGroup;

  @ViewChild('successModalContainer', {
    read: ViewContainerRef,
    static: true,
  })
  successModalContainer: ViewContainerRef;

  constructor(
    private presenter: NewPresenter,
    private router: Router,
    private fb: FormBuilder,
    private resolver: ComponentFactoryResolver
  ) {
    this.presenter.setView(this);
    this.setForm();
  }

  ngOnInit(): void {}

  setForm() {
    this.productForm = this.fb.group({
      codProducto: [null, []],
      unidad: [null, []],
      descripcion: [null, []],
      mtoValorUnitario: [null, []],
    });
  }

  onSaveButtonTapped() {
    const data: IProduct = this.productForm.value;
    this.presenter.saveProduct(data);
  }

  onSuccessSave(result) {
    this.createModal();
  }

  createModal() {
    this.successModalContainer.clear();
    const factory = this.resolver.resolveComponentFactory(ModalComponent);
    const componentRef = this.successModalContainer.createComponent(factory);
    componentRef.instance.title = 'Guardado Exitoso';
    componentRef.instance.description = 'El producto se guardó correctamente';
    componentRef.instance.callback.subscribe(() => {
      this.router.navigate(['productos']);
    });
  }
}
