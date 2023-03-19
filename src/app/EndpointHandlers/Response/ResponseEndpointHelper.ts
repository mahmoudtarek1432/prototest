import { IRequest } from "src/app/models/IRequest";
import { ProtobufType } from "src/ProtoWraper/ProtoBufType";


export class ResponseEndpointHelper{
    RequestDelgate!: {[Id:number] : ((protoMessage:any)=> void)}

    constructor(){
        
    }

    AddResponseEndpoint(RequestType:{new():IRequest}, requestDelegate:(protoMessage:any)=>void ){
        let requestId = new RequestType().Id
        this.RequestDelgate[requestId] = requestDelegate
    }

    ResolveResponseEndpoint(id:number, protoMessage:ProtobufType){
        this.RequestDelgate[id](protoMessage)
    }
}