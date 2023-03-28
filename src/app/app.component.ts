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
  constructor( private protoInstance: ProtoRootInstance, private cityService:CityService){
    const cityResponse = "message CityResponse {\
      int32 token =  1;\
      string name =  2;\
      repeated int32 list =  3;\  }"
    const cityRequest = "message CityRequest {\
      int32 token =  1;\
      string name =  2;\
      repeated int32 list =  3;\  }"

      ProtobufEndpointBuilder.addProtoEndpoint(cityResponse,EndpointType.response)
      ProtobufEndpointBuilder.addProtoEndpoint(cityRequest,EndpointType.request)

      protoInstance.instantiate()

      let cr = new CityRequest();
      cr.requestId = 1;
      cr.methodType = MethodType.POST;
      cr.isSubscribe = false;

      let cres = new CityResponse();
      cres.requestId = 1;
      cres.name = "cairo"
      cres.resultCode = 200

      let ed = new ResponseEndpoints()
      ed.city_responses = [cres]

      let reqed = new RequestEndpoints()
      reqed.city_requests = [cr]

      cityService.GetCity(cr).subscribe(r => console.log(r))

      let wrapper = new ProtoWrapper(protoInstance.ResponseType);
      let encodedmsg = wrapper.EncodeMessage(ed)

      let decodedEndpointResponse = wrapper.Decode<{[k:string]: IResponse[]}>(encodedmsg)
      console.log(decodedEndpointResponse)
      EndpointReciever.handle(decodedEndpointResponse)
  }
  /*test(){
    const file = "message ProductResponse {\
      int32 token =  1;\
      string name =  2;\
      repeated int32 list =  3;\  }"

      ProtobufEndpointBuilder.addProtoEndpoint(file,EndpointType.response)

      console.log(ProtobufEndpointBuilder.buildResponseEndpoint())

      var root = new proto.Root();
      proto.parse(ProtobufEndpointBuilder.buildResponseEndpoint(), root, { keepCase: true, alternateCommentMode: false, preferTrailingComment: false });
      root.resolveAll();

      var protoType = root.lookupType("Endpoint.RequestEndpoints")

      let pr = new ProductResponse()
      pr.requestId = 2
      pr.name = "am alive"
      pr.resultCode = 200
      pr.list = [1,2,3]

      let ed = new RequestEndpoints()
      ed.productresponses = [pr]

      let c = protoType.create(ed)
      console.log(c)
      let e = protoType.encode(c).finish()
      console.log(e)
      let d = protoType.decode(e).toJSON()
      console.log(d)

      var look = proto.load("./assets/protos/testProto.proto",(err,t) =>{
        var m = t!.lookupType("Endpoint.RequestEndpoints")
        let c = protoType.create(ed)
        let e = m.encode(ed).finish()
        console.log(e)
        let d = m.decode(e).toJSON()
        console.log(d)
      })
  }*/
}