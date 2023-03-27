import * as protobuf from "protobufjs";
import { ProtobufEndpointBuilder } from "./ProtobufEndpointBuilder";
import { ProtobufType } from "./ProtoBufType";
import { ProtoFileStringManipulation } from "./ProtoFileStringManipulation";

export class ProtoRootInstance{
    Type!: protobuf.Type

    constructor(){

    }

    instantiate(){

        this.Type = this.buildType().lookupType("Endpoint.RequestEndpoints")
        return this.Type;
    }

    buildType(){
        let protoroot = new protobuf.Root();
        protobuf.parse(ProtobufEndpointBuilder.buildEndpoint(), protoroot, { keepCase: true, alternateCommentMode: false, preferTrailingComment: false });
        protoroot.resolveAll();
        return protoroot
    }    
}
