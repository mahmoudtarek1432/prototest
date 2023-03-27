import { Component, OnInit } from '@angular/core';
import * as proto from 'protobufjs'
import { ProtobufType } from 'src/app/helper/Protobuf/ProtoBufType';
import { ProtoRootInstance } from 'src/app/helper/Protobuf/ProtoRootInstance';
import { ProtoWrapper } from 'src/app/helper/Protobuf/protowrapper';
import { EndpointsSubjects } from 'src/app/helper/Subject/Endpoints-Subjects';
import { EndpointsMap } from 'src/app/helper/Endpoint Managment/EnpointMap';
import { EndpointReciever } from './helper/Endpoint Managment/EndpointReciever';
import { websocketHelper } from './helper/Websocket/WebsocketHelper';
import { EndpointResponses } from './models/endpoint-responses';
import { LoginResponse } from './models/login-response';
import { LoginEndpoint } from './Services/LoginService/login-endpoint.service';
import { EndpointType } from './helper/Protobuf/ProtoFileStringManipulation';
import { ProtobufEndpointBuilder } from './helper/Protobuf/ProtobufEndpointBuilder';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'prototest';
  constructor( private protoInstance: ProtoRootInstance, private protoEndpointBuilder: ProtobufEndpointBuilder){
    const file = "message ProductResponse {\
      int32 token =  1;\
      string name =  2;\
      repeated int32 list =  3;\  }"

      protoEndpointBuilder.addProtoEndpoint(file,EndpointType.request)
      protoEndpointBuilder.addProtoEndpoint(file,EndpointType.response)
      protoEndpointBuilder.addProtoEndpoint(file,EndpointType.request)

      protoEndpointBuilder.buildEndpoint()

      console.log(protoEndpointBuilder.buildEndpoint());
    
   /* let type = new ProtobufType('./assets/protos/ResponseEndpoint.proto', 'ResponsePackage', 'endpoint_responses')
    this.protoInstance.instantiate(type).then(() =>
    {
                 
    })*/
  }
  async ngOnInit() {
   
  }
}
