import { Component, OnInit } from '@angular/core';
import * as proto from 'protobufjs'
import { ProtobufType } from 'src/ProtoWraper/ProtoBufType';
import { ProtoRootInstance } from 'src/ProtoWraper/ProtoRootInstance';
import { ProtoWrapper } from 'src/ProtoWraper/protowrapper';
import { EndpointsSubjects } from 'src/Shared/Endpoints-Subjects';
import { EndpointsMap } from 'src/Shared/EnpointMap';
import { EndpointReciever } from './helper/EndpointReciever';
import { websocketHelper } from './helper/WebsocketHelper';
import { EndpointResponses } from './models/endpoint-responses';
import { LoginResponse } from './models/login-response';
import { LoginEndpoint } from './Services/LoginService/login-endpoint.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'prototest';
  constructor( private protoInstance: ProtoRootInstance){
    let type = new ProtobufType('./assets/protos/ResponseEndpoint.proto', 'ResponsePackage', 'endpoint_responses')
    this.protoInstance.instantiate(type).then(() =>
    {
      let wrapper = new ProtoWrapper(this.protoInstance)
    EndpointsMap.CreateEndpoint(LoginResponse,LoginEndpoint)
    websocketHelper.ReciveWebsocketMessage((message)=>{       
      let decodedEndpointResponse = wrapper.Decode<EndpointResponses>(message.data)
      EndpointReciever.handle(decodedEndpointResponse)
    });           
    })
  }
  async ngOnInit() {
   
  }
}
