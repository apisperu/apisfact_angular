import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './views/list/list.component';
import { NewComponent } from './views/new/new.component';
import { EditComponent } from './views/edit/edit.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'nuevo', component: NewComponent },
  { path: ':id', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
