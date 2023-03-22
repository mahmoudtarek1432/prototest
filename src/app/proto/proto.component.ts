import { Component } from '@angular/core';
import * as protobuf from 'protobufjs';
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
import { EndpointRequests } from '../models/endpoint-requests';
import { EndpointResponses } from '../models/endpoint-responses';
import { LoginResponse } from '../models/login-response';
import { ProductResponse } from '../models/product-response';
import { LoginEndpoint } from '../Services/LoginService/login-endpoint.service';
import { LoginService } from '../Services/LoginService/login.service';


@Component({
  selector: 'app-proto',
  templateUrl: './proto.component.html',
  styleUrls: ['./proto.component.scss']
})
export class ProtoComponent {

  prototext!:any;

  constructor(private loginService: LoginEndpoint,private client: WebsocketRequestClient){
    this.loginService.SubscribeToBroadcast().subscribe((r) => console.log(r))
    
  }

  async encode2(){
    const awsomeData = new Awesome();
    awsomeData.awesomeField = this.prototext;
    let protoHelper = await ProtoHelper.encode('./assets/protos/webapi_3.proto', 'awesome_3', 'Awesome', awsomeData);
    console.log(protoHelper);
    console.log(ProtoHelper.toHexString(protoHelper));
  }

  async decode2(){
    const bytes = ProtoHelper.fromHexString(this.prototext);
    let protoHelper = await ProtoHelper.decode<Awesome>('./assets/protos/webapi_3.proto', 'awesome_3', 'Awesome', bytes);
    console.log(protoHelper);
  }




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
    let x = await this.client.request<LoginResponse>(new EndpointRequests('./assets/protos/webapi_3.proto', 'awesome_3', 'Awesome'));
    x.subscribe((d) => console.log(d))
    let y = await this.client.request<LoginResponse>(new EndpointRequests('./assets/protos/webapi_3.proto', 'awesome_3', 'Awesome'));
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
    let x = await this.client.request<LoginResponse>(new EndpointRequests('./assets/protos/webapi_3.proto', 'awesome_3', 'Awesome'));
    x.subscribe((d) => console.log(d))
    let y = await this.client.request<LoginResponse>(new EndpointRequests('./assets/protos/webapi_3.proto', 'awesome_3', 'Awesome'));
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
}