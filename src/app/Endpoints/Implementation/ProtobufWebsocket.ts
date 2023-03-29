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
            let decodedEndpointResponse = wrapper.Decode<{[k:string]: IResponse[]}>(ev.data);
            EndpointReciever.handle(decodedEndpointResponse);
            return message(ev);
        }
    }

    public OpenWebsocket(){
        websocketHelper.getInstance();
        let wrapper = new ProtoWrapper(this.protoInstance.ResponseType);
        websocketHelper.websocketPort.onmessage = (ev)=>{
            let decodedEndpointResponse = wrapper.Decode<{[k:string]: IResponse[]}>(ev.data)
            EndpointReciever.handle(decodedEndpointResponse);
        }
    }
    
}