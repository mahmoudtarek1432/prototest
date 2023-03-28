import * as protobuf from "protobufjs";
import { ProtobufEndpointBuilder } from "./ProtobufEndpointBuilder";
import { ProtobufType } from "./ProtoBufType";
import { ProtoFileStringManipulation } from "./ProtoFileStringManipulation";

export class ProtoRootInstance{
    RequestType!: protobuf.Type;
    ResponseType!: protobuf.Type
    constructor(){

    }

    instantiate(){

        this.RequestType = this.builResquestProtoType().lookupType("Endpoint.RequestEndpoints")
        this.ResponseType = this.buildResponseProtoType().lookupType("Endpoint.ResponseEndpoints")

    }

    buildResponseProtoType(){
        let protoroot = new protobuf.Root();
        protobuf.parse(ProtobufEndpointBuilder.buildResponseEndpoint(), protoroot, { keepCase: true, alternateCommentMode: false, preferTrailingComment: false });
        protoroot.resolveAll();
        return protoroot
    }    
    builResquestProtoType(){
        let protoroot = new protobuf.Root();
        protobuf.parse(ProtobufEndpointBuilder.buildRequestEndpoint(), protoroot, { keepCase: true, alternateCommentMode: false, preferTrailingComment: false });
        protoroot.resolveAll();
        return protoroot
    } 
}
