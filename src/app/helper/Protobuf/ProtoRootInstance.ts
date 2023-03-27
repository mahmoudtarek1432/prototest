import * as protobuf from "protobufjs";
import { ProtobufEndpointBuilder } from "./ProtobufEndpointBuilder";
import { ProtobufType } from "./ProtoBufType";
import { ProtoFileStringManipulation } from "./ProtoFileStringManipulation";

export class ProtoRootInstance{
    protoRoot!: protobuf.Type

    constructor(){

    }

    async instantiate(prototype: ProtobufType):Promise<any>{

        let protoroot = new protobuf.Root();
        protobuf.parse(ProtobufEndpointBuilder.buildEndpoint(), protoroot, { keepCase: true, alternateCommentMode: false, preferTrailingComment: false });
        protoroot.resolveAll();
        this.protoRoot = protoroot.lookupType("Endpoint.RequestEndpoints")
    }

    
}
