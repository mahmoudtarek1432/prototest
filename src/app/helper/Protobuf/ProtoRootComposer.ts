import * as protobuf from "protobufjs";
import { ProtobufEndpointBuilder } from "./ProtobufEndpointBuilder";
import { ProtobufType } from "./ProtoBufType";
import { ProtoFileStringManipulation } from "./ProtoFileStringManipulation";
import { ProtoRootInstance } from "./IProtoRootInstance";

//composes proto root by concatinating protofiles as strings
export class ProtoRootComposer implements ProtoRootInstance{
    RequestType!: protobuf.Type;
    ResponseType!: protobuf.Type;
    constructor(){

    }

    instantiateBuilder(){
        this.RequestType = this.builResquestProtoType().lookupType("Endpoint.RequestEndpoints");
        this.ResponseType = this.buildResponseProtoType().lookupType("Endpoint.ResponseEndpoints");
    }

    instantiateFromString(request:string, resposne:string){
        this.RequestType = this.builResquestProtoType().lookupType("ProtobufWebsocket.Model.RequestEndpoint");
        this.ResponseType = this.buildResponseProtoType().lookupType("ProtobufWebsocket.Model.RequestEndpoint");
    }

    buildResponseProtoType(){
        let protoroot = new protobuf.Root();
        protobuf.parse(ProtobufEndpointBuilder.buildResponseEndpoint(), protoroot, { keepCase: true, alternateCommentMode: false, preferTrailingComment: false });
        protoroot.resolveAll();
        return protoroot;
    }    
    builResquestProtoType(){
        let protoroot = new protobuf.Root();
        protobuf.parse(ProtobufEndpointBuilder.buildRequestEndpoint(), protoroot, { keepCase: true, alternateCommentMode: false, preferTrailingComment: false });
        protoroot.resolveAll();
        return protoroot;
    } 
}
