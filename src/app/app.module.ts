import { inject, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProtoComponent } from './proto/proto.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzInputModule } from 'ng-zorro-antd/input';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EndpointsSubjects } from 'src/app/helper/Subject/Endpoints-Subjects';
import { ProtoRootInstance } from 'src/app/helper/Protobuf/ProtoRootComposer';
import { ProtobufType } from 'src/app/helper/Protobuf/ProtoBufType';
import { ProtobufEndpointBuilder } from './helper/Protobuf/ProtobufEndpointBuilder';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ProtoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzInputModule
  ],
  providers: [
    EndpointsSubjects,
    ProtoRootInstance,
    ProtobufEndpointBuilder,
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { 
  static injectorInstance: Injector;
  //static injector instantiated for global use
  constructor(private DIinstance: Injector){
    
    AppModule.injectorInstance = this.DIinstance;
  }
}
