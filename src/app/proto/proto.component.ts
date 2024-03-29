import { Component } from '@angular/core';
import * as protobuf from 'protobufjs';
import { Observable } from 'rxjs';
import { ProtobufType } from 'src/ProtoWraper/ProtoBufType';
import { ProtoWrapper } from 'src/ProtoWraper/protowrapper';
import { EndpointsSubjects } from 'src/Shared/Endpoints-Subjects';
import { EndpointsMap } from 'src/Shared/EnpointMap';
import { WebsocketRequestClient } from '../Endpoints/WebsocketRequestClient';
import { EndpointReciever } from '../helper/EndpointReciever';
import { ProtoHelper } from '../helper/proto-helper';
import { ServiceInjection } from '../helper/ServiceInjection';
import { ServiceInstancefactory } from '../helper/ServiceInstancefactory';
import { Awesome } from '../models/awesome';
import { CityResponse } from '../models/city-response';
import { EndpointRequests } from '../models/endpoint-requests';
import { EndpointResponses } from '../models/endpoint-responses';
import { LoginResponse } from '../models/login-response';
import { ProductResponse } from '../models/product-response';
import { LoginEndpoint } from '../Services/LoginService/login-endpoint.service';
import { LoginService } from '../Services/LoginService/login.service';
import { RequestService } from '../Services/RequestService/request.service';


@Component({
  selector: 'app-proto',
  templateUrl: './proto.component.html',
  styleUrls: ['./proto.component.scss']
})
export class ProtoComponent {

  cityinfo: Observable<CityResponse> | undefined
  prototext!:any;

  constructor(private loginService: LoginEndpoint,private requestService: RequestService){
    this.loginService.SubscribeToBroadcast().subscribe((r) => console.log(r));
    
  }

  async getCityInfo(){
    this.cityinfo = await this.requestService.GetCity(new CityResponse());
  }
}

 /* async encode2(){
    let endpoint = this.buildendpoint()
    this.prototext = await ProtoHelper.encode('./assets/protos/ResponseEndpoint.proto', 'ResponsePackage', 'endpoint_responses', endpoint);
  }

  async decode2(){
    let x = await ProtoHelper.decode<EndpointResponses>('./assets/protos/ResponseEndpoint.proto', 'ResponsePackage', 'endpoint_responses', this.prototext);
    console.log(this.buildendpoint())
    console.log(x)
  }
*/

/*

  TestBroadCast(){
    let er = new EndpointResponses()                          //from server after decoding
    //EndpointsMap.CreateEndpoint(LoginResponse,LoginEndpoint)  //need to fix
    let lr = new LoginResponse()
    lr.resultCode = 410
    er.loginResponses = [lr]

    EndpointReciever.handle(er)
  }

  async testRequestResponse(){
    //request
    let type = new ProtobufType('./assets/protos/ResponseEndpoint.proto', 'ResponsePackage', 'endpoint_responses')
    let x = await this.client.request<LoginResponse>(this.buildendpoint(),type);
    x.subscribe((d) => console.log(d))
    let y = await this.client.request<LoginResponse>(this.buildendpoint(),type);
    y.subscribe((d) => console.log(d))
    //response
    let Endpoint = new EndpointResponses() 
    let XEndpointLR = new LoginResponse()
    XEndpointLR.resultCode = 200
    XEndpointLR.requestId = 1
    XEndpointLR.token = "response from 1"

    let YEndpointLR = new ProductResponse()
    YEndpointLR.resultCode = 300
    YEndpointLR.requestId = 2
    YEndpointLR.name = "response from 2"

    Endpoint.loginResponses = [XEndpointLR]
    Endpoint.productResponses = [YEndpointLR]

    EndpointReciever.handle(Endpoint)
  }


  async mix(){

    let er = new EndpointResponses()                          //from server after decoding
    //EndpointsMap.CreateEndpoint(LoginResponse,LoginEndpoint)  //need to fix
    let lr = new LoginResponse()
    lr.resultCode = 410


    //request
    let type = new ProtobufType('./assets/protos/ResponseEndpoint.proto', 'ResponsePackage', 'endpoint_responses')
    let x = await this.client.request<LoginResponse>(this.buildendpoint(),type);
    x.subscribe((d) => console.log(d))
    let y = await this.client.request<LoginResponse>(this.buildendpoint(),type);
    y.subscribe((d) => console.log(d))
    //response
    let XEndpointLR = new LoginResponse()
    XEndpointLR.resultCode = 200
    XEndpointLR.requestId = 1
    XEndpointLR.token = "response from 1"

    let YEndpointLR = new ProductResponse()
    YEndpointLR.resultCode = 300
    YEndpointLR.requestId = 2
    YEndpointLR.name = "response from 2"

    er.loginResponses = [XEndpointLR,lr]
    er.productResponses = [YEndpointLR]

    EndpointReciever.handle(er)
  }


  protoFileAccessor(callback:(protomessage: protobuf.Type| undefined) => any){
    
    protobuf.load("./assets/testingprotojs.proto",(err,root)=>{
    var message = root?.lookupType("package.testingproto");
      callback(message);
    });
  }

  buildendpoint(){
    let endpoint = new EndpointResponses()
    let lr = new LoginResponse()
    lr.requestId = 1
    lr.resultCode = 200
    lr.token = "dump"
    let pr = new ProductResponse()
    pr.requestId = 2
    pr.resultCode = 211
    pr.name = "test"
    endpoint.loginResponses = [lr]
    endpoint.productResponses = [pr]
    console.log(endpoint)
    return endpoint
  }
}*/