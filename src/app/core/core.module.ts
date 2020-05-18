import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './interceptors/api-interceptor.service';
import { LoginService } from './services/login.service';
import { CompanyService } from './services/company.service';
import { LoginGuard } from './guards/login.guard';
import { BillingService } from './services/billing.service';
import { ClientService } from './services/client.service';
import { ProductService } from './services/product.service';
import { AppStoreModule } from './store/store.module';

const providers = [
  LoginService,
  CompanyService,
  ClientService,
  ProductService,
  BillingService,
  LoginGuard,
];

@NgModule({
  imports: [HttpClientModule, AppStoreModule],
  providers: [
    ...providers,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
})
export class CoreModule {}
