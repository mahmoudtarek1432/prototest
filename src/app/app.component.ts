import { jsDocComment } from '@angular/compiler';
import { Component } from '@angular/core';
import { Service } from 'protobufjs';
import { EndpointsSubjects } from 'src/Shared/Endpoints-Subjects';
import { AppModule } from './app.module';
import { EndpointResponseFactory } from './Endpoints/EndpointResponseFactory';
import { loginEndpoint } from './Endpoints/LoginEndopoint';
import { ProtoHelper } from './helper/proto-helper';
import { websocketHelper } from './helper/WebsocketHelper';
import { EndpointResponses } from './models/endpoint-responses';
import { IRequest } from './models/IRequest';
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
      decoded.then((endpointResponses) =>{

        endpointResponses


        endpointResponses.loginResponses?.map((endpointResponses)=>{
          if(endpointResponses.requestId!=null){
            //EndpointResponseFactory.Create(response.requestId).handle(response); //find a way to fix typing
            switch(endpointResponses.requestId){
              case 1:
                AppModule.injectorInstance.get(LoginService).AuthResponse(endpointResponses)
            }
          }
        })
      })
    })
  }
}
