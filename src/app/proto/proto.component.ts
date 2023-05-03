import { Component } from '@angular/core';
import * as protobuf from 'protobufjs';
import { WebsocketRequestClient } from '../Endpoints/Implementation/WebsocketRequestClient';
import { EndpointReciever } from '../helper/Endpoint Managment/EndpointReciever';
import { IResponse } from '../helper/Endpoint Managment/model/IResponse';
import { MethodType } from '../helper/Endpoint Managment/model/method_type';
import { ProtoRootInstance } from '../helper/Protobuf/ProtoRootComposer';
import { ProtoWrapper } from '../helper/Protobuf/protowrapper';
import { CityRequest } from '../models/city-request';
import { CityResponse } from '../models/city-response';
import { RequestEndpoints } from '../models/endpoint-requests';
import { ResponseEndpoints } from '../models/endpoint-responses';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { CityService } from '../Services/CityService/city.service';

import { LoginEndpoint } from '../Services/LoginService/login-endpoint.service';
import { ProductResponse } from '../models/product-response';
import { ProductRequest } from '../models/product-request';


@Component({
  selector: 'app-proto',
  templateUrl: './proto.component.html',
  styleUrls: ['./proto.component.scss']
})
export class ProtoComponent {

  prototext!:any;

  constructor(private protoInstance: ProtoRootInstance,private cityRequest: CityService){
  }

  openBroadcast(){
   
    let x = new LoginEndpoint();
    x.SubscribeToBroadcast(new LoginRequest()).subscribe(r => console.log(r))
  }

  async testRequestResponse(){
    let cr = new ProductRequest();
    cr.request_id = 1;
    cr.method_type = MethodType.POST;
    cr.is_subscribe = true;
    cr.name = "mahmoud";
    cr.price = 20;
    cr.description = "Description: from client"

    this.cityRequest.GetCity(cr).subscribe(r => console.log(r))


    let cres = new ProductResponse();
    cres.requestId = 1;
    cres.name = "cairo"
    cres.resultCode = 200

    let ed = new ResponseEndpoints()
    ed.ProductResponse = [cres]
    
    let wrapper = new ProtoWrapper(this.protoInstance.ResponseType);
    let encodedmsg = wrapper.EncodeMessage(ed)

    let decodedEndpointResponse = wrapper.Decode<{[k:string]: IResponse[]}>(encodedmsg)
    console.log(decodedEndpointResponse)
    EndpointReciever.handle(decodedEndpointResponse)
  }

  async testMix(){
    let cr = new ProductRequest();
    cr.request_id = 1;
    cr.method_type = MethodType.POST;
    cr.is_subscribe = false;


    this.cityRequest.GetCity(cr).subscribe(r => console.log(r))


    let cres = new ProductResponse();
    cres.requestId = 2;
    cres.name = "cairo"
    cres.resultCode = 200

    let lres = new LoginResponse();
    lres.requestId = 1;

    lres.resultCode = 410

    let ed = new ResponseEndpoints()
    ed.ProductResponse = [cres]

    
    let wrapper = new ProtoWrapper(this.protoInstance.ResponseType);
    let encodedmsg = wrapper.EncodeMessage(ed)

    let decodedEndpointResponse = wrapper.Decode<ResponseEndpoints>(encodedmsg)
    EndpointReciever.handle(decodedEndpointResponse)
  }
}