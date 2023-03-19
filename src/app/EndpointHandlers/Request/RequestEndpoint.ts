import { IRequest } from "src/app/models/IRequest";
import { loginRequest } from "src/app/models/login-request";
import { loginProto } from "src/proto/LoginProto";
import { ProtobufType } from "src/ProtoWraper/ProtoBufType";


export class RequestEndpoint{
    RequestDelgate!: {[Id:number] : ((protoMessage:any)=> void)}

    constructor(){
        
    }

    AddRequestEndpoint(request:IRequest, requestDelegate:(protoMessage:ProtobufType)=>void ){
        this.RequestDelgate[request.Id] = requestDelegate
    }

    resolveEndpoint(id:number, protoMessage:ProtobufType){
        this.RequestDelgate[id](protoMessage)
    }
}