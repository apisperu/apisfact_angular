import { Component, OnInit, Type, ViewContainerRef } from '@angular/core';
import { EditPresenter } from './edit.presenter';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IItem } from 'src/app/core/services/client.service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [EditPresenter],
})
export class EditComponent implements OnInit {
  docNumber = '';
  clientForm: FormGroup;
  documentType = null;
  personalDocumentTypeList = [] as IItem[];

  constructor(
    private presenter: EditPresenter,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private vcRef: ViewContainerRef
  ) {
    this.setForm();
    this.presenter.setView(this);
    this.presenter.getPersonalDocumentTypeList();
    this.activatedRoute.params.subscribe((data) => {
      this.docNumber = data.id;
      this.presenter.getClient(this.docNumber);
    });
  }

  ngOnInit(): void {}

  setData(data) {
    const typeDoc = this.personalDocumentTypeList.find(
      (item) => item.code === data.tipoDoc
    );
    this.clientForm.get('tipoDoc').setValue(typeDoc ? typeDoc.value : '');
    this.clientForm.get('numDoc').setValue(data.numDoc);
    this.clientForm.get('rznSocial').setValue(data.rznSocial);
    this.clientForm.get('address').setValue(data.address.direccion);
  }

  setForm() {
    this.clientForm = this.fb.group({
      tipoDoc: [{ value: 'DNI', disabled: true }, []],
      numDoc: [{ value: null, disabled: true }, []],
      rznSocial: [null, []],
      address: [null, []],
    });
  }

  setDocumentTypeList(data: IItem[]) {
    this.personalDocumentTypeList = data;
  }

  onSelectDocumentType() {}

  onSaveButtonTapped() {
    const data = this.clientForm.getRawValue();
    data.tipoDoc = this.documentType;
    data.address = {
      direccion: data.address,
    };
    this.presenter.updateClient(data);
  }

  onDeleteButtonTapped() {
    this.presenter.deleteClient(this.docNumber);
  }

  onSuccessSave() {}

  onSuccessDelete() {}
}
