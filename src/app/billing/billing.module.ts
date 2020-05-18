import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { ListComponent } from './views/list/list.component';
import { BillingRoutingModule } from './billing-routing.module';
import { TicketComponent } from './views/ticket/ticket.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const components = [];

@NgModule({
  imports: [
    CommonModule,
    BillingRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [ListComponent, TicketComponent, ...components],
  entryComponents: [...components],
  schemas: [NO_ERRORS_SCHEMA],
})
export class BillingModule {}
