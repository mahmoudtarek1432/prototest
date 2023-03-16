import { Component } from '@angular/core';
import * as protobuf from 'protobufjs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Message } from "protobufjs"
import { ProtobufType, ProtoWrapper } from 'src/ProtoWraper/protowrapper';
import { timeInterval } from 'rxjs';
import { ProtoHelper } from '../helper/proto-helper';
import { Awesome } from '../models/awesome';
import { from, Observable } from 'rxjs';


@Component({
  selector: 'app-proto',
  templateUrl: './proto.component.html',
  styleUrls: ['./proto.component.scss']
})
export class ProtoComponent {
  wrapper!: ProtoWrapper
  prototext:any
  Text!:Observable<any>

  constructor(){
    this.wrapper = new ProtoWrapper(new ProtobufType("./assets/testingprotojs.proto", "package.testingproto"))
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


  encode(){
    var payload = {"awesomeField": this.prototext, "awesomeType": 2}

    this.wrapper.create(payload).then(msg=> 
    this.wrapper.Encode(msg).then(r => this.prototext = r))
      
    }

  decode(){
    
    this.wrapper.Decode(Uint8Array.from(this.prototext))
           .then(r => this.prototext = r)
           .then(()=> this.wrapper.toObject(this.prototext)
           .then((r)=> this.prototext = r["awesomeType"]))
  }



  protoFileAccessor(callback:(protomessage: protobuf.Type| undefined) => any){
    
    protobuf.load("./assets/testingprotojs.proto",(err,root)=>{
    var message = root?.lookupType("package.testingproto");
      callback(message)
    })
  }
}