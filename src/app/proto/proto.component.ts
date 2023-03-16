import { Component } from '@angular/core';
import * as protobuf from 'protobufjs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Message } from "protobufjs"
import { ProtobufType, ProtoWrapper } from 'src/ProtoWraper/protowrapper';
import { timeInterval } from 'rxjs';
import { ProtoHelper } from '../helper/proto-helper';
import { Awesome } from '../models/awesome';

@Component({
  selector: 'app-proto',
  templateUrl: './proto.component.html',
  styleUrls: ['./proto.component.scss']
})
export class ProtoComponent {

  prototext:any


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

  encode(){
    var payload = {"awesomeField": this.prototext}
    this.protoFileAccessor((message) =>{
      var errmsg = message?.verify(payload)
      if(errmsg)
        throw Error(errmsg)

      var msg = message!.create(payload)
      var wrapper = new ProtoWrapper(new ProtobufType("./assets/testingprotojs.proto", "package.testingproto"))
      
      var encoded = wrapper.Encode(msg)
      console.log(encoded)
    })

  }

  decode(){
    this.protoFileAccessor((message) => {
      var msgobj = message!.decode(this.prototext)
      var proto = message!.toObject(msgobj)
      this.prototext = proto["awesomeField"]
    })
  }

  protoFileAccessor(callback:(protomessage: protobuf.Type| undefined) => any){
    
    protobuf.load("./assets/testingprotojs.proto",(err,root)=>{
    var message = root?.lookupType("package.testingproto");
      callback(message)
    })
  }
}

class test {
  awesome_field:string = "sad"
}