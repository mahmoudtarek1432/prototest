import { EndpointReciever } from "src/app/helper/Endpoint Managment/EndpointReciever";
import { IResponse } from "src/app/helper/Endpoint Managment/model/IResponse";
import { ProtoRootComposer } from "src/app/helper/Protobuf/ProtoRootComposer";
import { ProtoRootProvider } from "src/app/helper/Protobuf/ProtoRootProvider";
import { ProtoWrapper } from "src/app/helper/Protobuf/protowrapper";
import { MessageActionFactory } from "src/app/helper/Websocket/MessageAction/MessageActionFactory";
import { websocketHelper } from "src/app/helper/Websocket/WebsocketHelper";

export class ProtobufWebsocket{

    constructor(private protoInstance: ProtoRootProvider){

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

    public OpenWebsocket(port:string =""){
        websocketHelper.getInstance(port);
        let wrapper = new ProtoWrapper(this.protoInstance.ResponseType);
        websocketHelper.websocketPort.onmessage = async (ev:MessageEvent)=>{
            var incomingType = Object.getPrototypeOf(ev.data).constructor.name;
            var MessageAction = MessageActionFactory.buildAction(incomingType,[wrapper,this.protoInstance])
            MessageAction!.fireAction(ev.data)
        }
    }
    
}