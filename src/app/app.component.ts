import { jsDocComment } from '@angular/compiler';
import { Component } from '@angular/core';
import { Service } from 'protobufjs';
import { EndpointsSubjects } from 'src/Shared/Endpoints-Subjects';
import { Globals } from 'src/Shared/Globals';
import { AppModule } from './app.module';
import { EndpointReciever } from './helper/EndpointHandler';
import { ProtoHelper } from './helper/proto-helper';
import { ServiceInstancefactory } from './helper/ServiceInstancefactory';
import { SubjectHandler } from './helper/Subject-helper';
import { websocketHelper } from './helper/WebsocketHelper';
import { EndpointResponses } from './models/endpoint-responses';
import { IRequest } from './models/IRequest';
import { IResponse } from './models/IResponse';
import { LoginRequest } from './models/login-request';
import { LoginResponse } from './models/login-response';
import { LoginEndpoint } from './Services/LoginService/login-endpoint.service';
import { LoginService } from './Services/LoginService/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'prototest';
  constructor(testSubject: EndpointsSubjects){

    websocketHelper.ReciveWebsocketMessage((message)=>{                                                               //case of auth endpoint
      let decoded = ProtoHelper.decode<EndpointResponses>("temp","endpoint","endpointResponse",message.data)
      decoded.then((EndpointResponse) => EndpointReciever.handle(EndpointResponse))
    })
  }
  }
