import { Component, OnInit } from '@angular/core';
import * as proto from 'protobufjs'
import { ProtobufType } from 'src/app/helper/Protobuf/ProtoBufType';
import { ProtoRootInstance } from 'src/app/helper/Protobuf/ProtoRootInstance';
import { ProtoWrapper } from 'src/app/helper/Protobuf/protowrapper';
import { EndpointsSubjects } from 'src/app/helper/Subject/Endpoints-Subjects';
import { EndpointsMap } from 'src/app/helper/Endpoint Managment/EnpointMap';
import { EndpointReciever } from './helper/Endpoint Managment/EndpointReciever';
import { websocketHelper } from './helper/Websocket/WebsocketHelper';
import { ResponseEndpoints } from './models/endpoint-responses';
import { LoginResponse } from './models/login-response';
import { LoginEndpoint } from './Services/LoginService/login-endpoint.service';
import { EndpointType } from './helper/Protobuf/ProtoFileStringManipulation';
import { ProtobufEndpointBuilder } from './helper/Protobuf/ProtobufEndpointBuilder';
import { ProductResponse } from './models/product-response';
import { CityService } from './Services/CityService/city.service';
import { CityRequest } from './models/city-request';
import { MethodType } from './helper/Endpoint Managment/model/method_type';
import { CityResponse } from './models/city-response';
import { ProtobufWebsocket } from './Endpoints/Implementation/ProtobufWebsocket';
import { IResponse } from './helper/Endpoint Managment/model/IResponse';
import { RequestEndpointResolver } from './Endpoints/Implementation/RequestEndpointResolver';
import { RequestEndpoints } from './models/endpoint-requests';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'prototest';
  constructor( private protoInstance: ProtoRootInstance){
    const cityResponse = "message CityResponse {\
      string token =  1;\
      string name =  2;\
      repeated int32 list =  3;\  }"
    const cityRequest = "message CityRequest {\
      string token =  1;\
      string name =  2;\
      repeated int32 list =  3;\  }"

      const loginResponse = "message LoginResponse {\
        string token =  1;\
        string name =  2;\
        repeated int32 list =  3;\  }"

      ProtobufEndpointBuilder.addProtoEndpoint(cityResponse,EndpointType.response)
      ProtobufEndpointBuilder.addProtoEndpoint(cityRequest,EndpointType.request)
      ProtobufEndpointBuilder.addProtoEndpoint(loginResponse,EndpointType.response)
      this.protoInstance.instantiate()

      let websocket = new ProtobufWebsocket(protoInstance);
      websocket.OpenWebsocket()

  }
}