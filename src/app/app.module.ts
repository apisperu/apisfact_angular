import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsEmitPluginModule } from '@ngxs-labs/emitter';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from 'src/environments/environment';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([], { developmentMode: !environment.production }),
    NgxsStoragePluginModule.forRoot(),
    NgxsEmitPluginModule.forRoot(),
    environment.devToolsEnabled ? NgxsReduxDevtoolsPluginModule.forRoot() : [],
    AppRoutingModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
