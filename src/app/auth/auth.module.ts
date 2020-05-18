import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './views/login/login.component';
import { AuthRoutingModule } from './auth.routing';

@NgModule({
  imports: [AuthRoutingModule, ReactiveFormsModule],
  exports: [],
  declarations: [LoginComponent],
  providers: [],
})
export class AuthModule {}
