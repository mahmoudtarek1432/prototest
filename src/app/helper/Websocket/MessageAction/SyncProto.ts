import { ProtoRootProvider } from "../../Protobuf/ProtoRootProvider";
import { ProtoRootRemoteBuilder } from "../../Protobuf/ProtoRootRemoteBuilder";
import { IMessageAction } from "./MessageAction";

export class SyncProto implements IMessageAction{
    constructor(protoRootProvider: ProtoRootProvider){

    }

    fireAction(message: string | Blob): void {
        var ProtoString = message as string
        var request = ProtoString.includes("RequestEndpoint")
        var response = ProtoString.includes("ResponseEndpoint")

        if(request){
            ProtoRootRemoteBuilder.builResquestProtoType(ProtoString)
        }
        else if(response){
            ProtoRootRemoteBuilder.buildResponseProtoType(ProtoString)
        }
    }

}