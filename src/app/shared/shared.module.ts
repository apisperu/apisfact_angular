import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

const components = [];
@NgModule({
  imports: [HttpClientModule],
  providers: [],
  declarations: [...components],
  entryComponents: [...components],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [...components],
})
export class SharedModule {}
