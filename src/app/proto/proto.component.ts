import { Component } from '@angular/core';
import * as protobuf from 'protobufjs';
import { AwesomeProto } from 'src/proto/AwesomeProto';
import { ProtobufType } from 'src/ProtoWraper/ProtoBufType';
import { ProtoWrapper } from 'src/ProtoWraper/protowrapper';
import { EndpointsSubjects } from 'src/Shared/Endpoints-Subjects';
import { EndpointsMap } from 'src/Shared/EnpointMap';
import { EndpointReciever } from '../helper/EndpointReciever';
import { ProtoHelper } from '../helper/proto-helper';
import { ServiceInjection } from '../helper/ServiceInjection';
import { ServiceInstancefactory } from '../helper/ServiceInstancefactory';
import { Awesome } from '../models/awesome';
import { EndpointResponses } from '../models/endpoint-responses';
import { LoginResponse } from '../models/login-response';
import { LoginEndpoint } from '../Services/LoginService/login-endpoint.service';


@Component({
  selector: 'app-proto',
  templateUrl: './proto.component.html',
  styleUrls: ['./proto.component.scss']
})
export class ProtoComponent {

  prototext!:any;

  constructor(private testSubject: EndpointsSubjects){
    this.testSubject.getSubjectObservable(LoginEndpoint.name).subscribe((s)=>{console.log(s)})
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


  encode(){
    let awesome = new AwesomeProto(this.prototext,1);
    let wrapper = new ProtoWrapper(AwesomeProto);

    wrapper.EncodeMessage(awesome)
    }

  test(){
    let er = new EndpointResponses()                          //from server after decoding
    EndpointsMap.CreateEndpoint(LoginResponse,LoginEndpoint)  //need to fix
    er.loginResponses = [new LoginResponse()]

    EndpointReciever.handle(er)
  }



  protoFileAccessor(callback:(protomessage: protobuf.Type| undefined) => any){
    
    protobuf.load("./assets/testingprotojs.proto",(err,root)=>{
    var message = root?.lookupType("package.testingproto");
      callback(message);
    });
  }
}