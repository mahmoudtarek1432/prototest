import { Component } from '@angular/core';
import * as protobuf from 'protobufjs';
import { WebsocketRequestClient } from '../Endpoints/Implementation/WebsocketRequestClient';
import { EndpointReciever } from '../helper/Endpoint Managment/EndpointReciever';
import { IResponse } from '../helper/Endpoint Managment/model/IResponse';
import { MethodType } from '../helper/Endpoint Managment/model/method_type';
import { ProtoRootInstance } from '../helper/Protobuf/ProtoRootInstance';
import { ProtoWrapper } from '../helper/Protobuf/protowrapper';
import { CityRequest } from '../models/city-request';
import { CityResponse } from '../models/city-response';
import { RequestEndpoints } from '../models/endpoint-requests';
import { ResponseEndpoints } from '../models/endpoint-responses';
import { CityService } from '../Services/CityService/city.service';

import { LoginEndpoint } from '../Services/LoginService/login-endpoint.service';


@Component({
  selector: 'app-proto',
  templateUrl: './proto.component.html',
  styleUrls: ['./proto.component.scss']
})
export class ProtoComponent {

  prototext!:any;

  constructor(private protoInstance: ProtoRootInstance,private cityRequest: CityService){
    
  }

  async testRequestResponse(){
    let cr = new CityRequest();
    cr.requestId = 1;
    cr.methodType = MethodType.POST;
    cr.isSubscribe = false;


    this.cityRequest.GetCity(cr).subscribe(r => console.log(r))


    let cres = new CityResponse();
    cres.requestId = 1;
    cres.name = "cairo"
    cres.resultCode = 200

    let ed = new ResponseEndpoints()
    ed.city_responses = [cres]
    
    let wrapper = new ProtoWrapper(this.protoInstance.ResponseType);
    let encodedmsg = wrapper.EncodeMessage(ed)

    let decodedEndpointResponse = wrapper.Decode<{[k:string]: IResponse[]}>(encodedmsg)
    console.log(decodedEndpointResponse)
    EndpointReciever.handle(decodedEndpointResponse)
  }
}