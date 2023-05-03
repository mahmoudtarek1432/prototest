import { EndpointReciever } from "../../Endpoint Managment/EndpointReciever";
import { IRequest } from "../../Endpoint Managment/model/IRequest";
import { ProtoWrapper } from "../../Protobuf/protowrapper";
import { IMessageAction } from "./MessageAction";

export class ExcuteRequest implements IMessageAction{
    constructor(private wrapper:ProtoWrapper){

    }
    async fireAction(message: string | Blob): Promise<any> {
        let blob = message as Blob
        let buffer = await blob.arrayBuffer();
        let uint8 = new Uint8Array(buffer);
        let decodedEndpointResponse = this.wrapper.Decode<{[k:string]: IRequest[]}>(uint8)
        EndpointReciever.handle(decodedEndpointResponse);
    }

}