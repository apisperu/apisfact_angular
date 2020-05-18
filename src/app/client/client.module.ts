import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { ListComponent } from './views/list/list.component';
import { ClientRoutingModule } from './client-routing.module';
import { NewComponent } from './views/new/new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './views/edit/edit.component';
import { CommonModule } from '@angular/common';

const components = [];

@NgModule({
  imports: [CommonModule, ClientRoutingModule, ReactiveFormsModule],
  declarations: [...components, ListComponent, NewComponent, EditComponent],
  entryComponents: [...components],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ClientModule {}
