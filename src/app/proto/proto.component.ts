import { Component } from '@angular/core';
import * as protobuf from 'protobufjs';
import { AwesomeProto } from 'src/ProtoModels/AwesomeProto';
import { ProtobufType } from 'src/ProtoWraper/ProtoBufType';
import { ProtoWrapper } from 'src/ProtoWraper/protowrapper';
import { ProtoHelper } from '../helper/proto-helper';
import { Awesome } from '../models/awesome';


@Component({
  selector: 'app-proto',
  templateUrl: './proto.component.html',
  styleUrls: ['./proto.component.scss']
})
export class ProtoComponent {

  prototext!:any;

  constructor(){
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


  async encode(){
    let awesome = new AwesomeProto(this.prototext,1);
    let wrapper = new ProtoWrapper(AwesomeProto);

    this.prototext = await wrapper.EncodeMessage(awesome)
      
    }

  decode(){
    
  }



  protoFileAccessor(callback:(protomessage: protobuf.Type| undefined) => any){
    
    protobuf.load("./assets/testingprotojs.proto",(err,root)=>{
    var message = root?.lookupType("package.testingproto");
      callback(message);
    });
  }
}