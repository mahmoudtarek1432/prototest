import { Component } from '@angular/core';
import { EndpointsSubjects } from 'src/Shared/Endpoints-Subjects';
import { EndpointsMap } from 'src/Shared/EnpointMap';
import { EndpointReciever } from './helper/EndpointReciever';
import { ProtoHelper } from './helper/proto-helper';
import { websocketHelper } from './helper/WebsocketHelper';
import { EndpointResponses } from './models/endpoint-responses';
import { LoginResponse } from './models/login-response';
import { LoginEndpoint } from './Services/LoginService/login-endpoint.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'prototest';
  constructor(private testSubject: EndpointsSubjects){
    EndpointsMap.CreateEndpoint(LoginResponse,LoginEndpoint)
    websocketHelper.ReciveWebsocketMessage((message)=>{       
      console.log(message)                                                        //case of auth endpoint
      let decoded = ProtoHelper.decode<EndpointResponses>('./assets/protos/ResponseEndpoint.proto', 'ResponsePackage', 'endpoint_responses',message.data)
      decoded.then((EndpointResponse) => EndpointReciever.handle(EndpointResponse))
    })
  }
}
