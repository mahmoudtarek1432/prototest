import { Component, OnInit } from '@angular/core';
import * as proto from 'protobufjs'
import { ProtobufType } from 'src/app/helper/Protobuf/ProtoBufType';
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
import { CityService } from './Services/CityService/city.service';
import { CityRequest } from './models/city-request';
import { MethodType } from './helper/Endpoint Managment/model/method_type';
import { CityResponse } from './models/city-response';
import { ProtobufWebsocket } from './Endpoints/Implementation/ProtobufWebsocket';
import { IResponse } from './helper/Endpoint Managment/model/IResponse';
import { RequestEndpointResolver } from './Endpoints/Implementation/RequestEndpointResolver';
import { RequestEndpoints } from './models/endpoint-requests';
import { ProductRequest } from './models/product-request';
import { ProtoRootProvider } from './helper/Protobuf/ProtoRootProvider';
import { MessageActionFactory } from './helper/Websocket/MessageAction/MessageActionFactory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'prototest';
  constructor( private protoInstance: ProtoRootProvider){
    //instantiating protoroot moved to proto
console.log(this.protoRequestMock())
    this.testRemote(this.protoRequestMock());
    this.testRemote(this.protoResponsetMock());
    this.testRemote(this.protoResponseMock());

    let websocket = new ProtobufWebsocket(protoInstance);
    websocket.OpenWebsocket('ws://127.0.0.1:80/test');

  }

  testRemote(stream:any){
    let wrapper = new ProtoWrapper(this.protoInstance.ResponseType);
    var incomingType = Object.getPrototypeOf(stream).constructor.name;
    var MessageAction = MessageActionFactory.buildAction(incomingType,[wrapper,this.protoInstance])
    MessageAction!.fireAction(stream)
  }

  protoRequestMock(){
    return "syntax = \"proto3\";\
    package ProtobufWebsocket.Model;\
    enum MethodType {\
       ZERO = 0; \
       HTTP = 1;\
       POST = 2;\
       PUT = 3;\
       PATCH = 4;\
       DELETE = 5;\
    }\
    message RequestEndpoint {\
       repeated product product = 1;\
    }\
    message product {\
       string Name = 1;\
       string Description = 2;\
       float Price = 3;\
       int32 request_id = 4;\
       bool is_subscribe = 5;\
       MethodType methode_type = 6;\
    }"
  }

  protoResponsetMock(){
    return "syntax = \"proto3\";\
    package ProtobufWebsocket.Model;\
     message Error {\
       string message = 1;\
    }\
    message ProductResponse {\
       string Name = 1;\
       string Description = 2;\
       float Price = 3;\
       int32 request_id = 4;\
       ResultCode resultCode = 5;\
       repeated Error Errors = 6;\
    }\
    message ResponseEndpoint {\
       repeated ProductResponse ProductResponse = 1;\
    }\
    enum ResultCode {\
       ZERO = 0; \
       Success = 200;\
       NotFound = 404;\
       Subscribed = 410;\
    }";
  }

  protoResponseMock(){
    return new Uint8Array([10,103,
      10,
      38,
      104,
      101,
      108,
      108,
      111,
      32,
      109,
      97,
      104,
      109,
      111,
      117,
      100,
      44,
      32,
      99,
      111,
      110,
      103,
      114,
      97,
      116,
      115,
      32,
      111,
      110,
      32,
      97,
      99,
      104,
      105,
      118,
      105,
      110,
      103,
      32,
      105,
      116,
      18,
      54,
      68,
      101,
      115,
      99,
      114,
      105,
      112,
      116,
      105,
      111,
      110,
      58,
      32,
      102,
      114,
      111,
      109,
      32,
      99,
      108,
      105,
      101,
      110,
      116,
      97,
      110,
      100,
      32,
      97,
      32,
      114,
      101,
      115,
      112,
      111,
      110,
      115,
      101,
      32,
      102,
      114,
      111,
      109,
      32,
      116,
      104,
      101,
      32,
      115,
      101,
      114,
      118,
      101,
      114,
      29,
      0,
      0,
      32,
      65,
      32,
      1,
      ])
  }
}