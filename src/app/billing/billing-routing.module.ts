import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './views/list/list.component';
import { TicketComponent } from './views/ticket/ticket.component';

const routes: Routes = [
  {
    path: 'emision',
    component: TicketComponent,
  },
  { path: '', component: ListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillingRoutingModule {}
