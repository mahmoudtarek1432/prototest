import { EndpointReciever } from "src/app/helper/Endpoint Managment/EndpointReciever";
import { IResponse } from "src/app/helper/Endpoint Managment/model/IResponse";
import { ProtoRootInstance } from "src/app/helper/Protobuf/ProtoRootInstance";
import { ProtoWrapper } from "src/app/helper/Protobuf/protowrapper";
import { websocketHelper } from "src/app/helper/Websocket/WebsocketHelper";

export class ProtobufWebsocket{

    constructor(private protoInstance: ProtoRootInstance){

    }

    //handle incoming message responses
    public OpenWebsocketWithMessage(message:(event:MessageEvent<any>)=>any){
        websocketHelper.getInstance();
        let wrapper = new ProtoWrapper(this.protoInstance.ResponseType);
        websocketHelper.websocketPort.onmessage = (ev)=>{
            let uint8 = new Uint8Array(ev.data);
            let decodedEndpointResponse = wrapper.Decode<{[k:string]: IResponse[]}>(uint8);
            EndpointReciever.handle(decodedEndpointResponse);
            return message(ev);
        }
    }

    public OpenWebsocket(){
        websocketHelper.getInstance();
        let wrapper = new ProtoWrapper(this.protoInstance.ResponseType);
        websocketHelper.websocketPort.onmessage = async (ev:MessageEvent<Blob>)=>{
            let buffer = await ev.data.arrayBuffer();
            let uint8 = new Uint8Array(buffer);
            let decodedEndpointResponse = wrapper.Decode<{[k:string]: IResponse[]}>(uint8)
            console.log(decodedEndpointResponse['product_responses'])
            EndpointReciever.handle(decodedEndpointResponse);
        }
    }
    
}