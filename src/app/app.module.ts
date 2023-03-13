import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormioModule, FormioAppConfig } from 'angular-formio';
import { BuilderComponent } from './builder/builder.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ComponentEventService } from './component-event.service';
import { PreviewComponent } from './preview/preview.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    BuilderComponent,
    PreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormioModule,
    ModalModule.forRoot(),
    NgxDropzoneModule
  ],
  providers: [
    ComponentEventService,
    {
        provide: LocationStrategy,
        useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
