import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { ListComponent } from './views/list/list.component';
import { NewComponent } from './views/new/new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './views/edit/edit.component';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

const components = [];

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [...components, ListComponent, NewComponent, EditComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ProductModule {}
