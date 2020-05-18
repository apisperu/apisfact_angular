import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './auth.state';
import { CompanyState } from './company.state';

@NgModule({
  imports: [NgxsModule.forFeature([AuthState, CompanyState])],
})
export class AppStoreModule {}
