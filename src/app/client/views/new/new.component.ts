import {
  Component,
  OnInit,
  Type,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver,
} from '@angular/core';
import { NewPresenter } from './new.presenter';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/core/services/client.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-client-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
  providers: [NewPresenter],
})
export class NewComponent implements OnInit {
  clientForm: FormGroup;
  documentType = '1';
  documentTypeList = [];

  @ViewChild('successModalContainer', {
    read: ViewContainerRef,
    static: true,
  })
  successModalContainer: ViewContainerRef;

  constructor(
    private presenter: NewPresenter,
    private router: Router,
    private fb: FormBuilder,
    private clientService: ClientService,
    private resolver: ComponentFactoryResolver
  ) {
    this.presenter.setView(this);
    this.clientService.getPersonalDocumentTypeList().subscribe((response) => {
      this.documentTypeList = response;
      console.log(this.documentTypeList);
    });
    this.setForm();
  }

  ngOnInit(): void {}

  setForm() {
    this.clientForm = this.fb.group({
      tipoDoc: [this.documentTypeList[0].code, []],
      numDoc: [null, []],
      rznSocial: [null, []],
      address: [null, []],
    });
  }

  onSelectDocumentType() {}

  onSaveButtonTapped() {
    const data = this.clientForm.value;
    data.tipoDoc = this.documentType;
    data.address = {
      direccion: data.address,
    };
    this.presenter.saveClient(data);
  }

  onSuccessSave() {
    this.createModal();
  }

  createModal() {
    this.successModalContainer.clear();
    const factory = this.resolver.resolveComponentFactory(ModalComponent);
    const componentRef = this.successModalContainer.createComponent(factory);
    componentRef.instance.title = 'EXITO';
    componentRef.instance.description = 'El cliente se guardó correctamente';
    componentRef.instance.callback.subscribe(() => {
      this.router.navigate(['clientes']);
    });
  }
}
