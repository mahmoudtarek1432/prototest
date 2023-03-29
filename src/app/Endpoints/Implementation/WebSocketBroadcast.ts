import { Injectable } from "@angular/core";
import { ProtoWrapper } from "src/app/helper/Protobuf/protowrapper";
import { websocketHelper } from "../../helper/Websocket/WebsocketHelper";
import { ProtoRootInstance } from "src/app/helper/Protobuf/ProtoRootInstance";
import { IRequest } from "src/app/helper/Endpoint Managment/model/IRequest";
import { RequestEndpoints } from "src/app/models/endpoint-requests";
import { EndpointFeeder } from "src/app/helper/Endpoint Managment/EndpointFeeder";

@Injectable({
    providedIn: 'root'
  })
  export class WebSocketBroadcast{
    constructor(private ProtoInstance: ProtoRootInstance){
    }
    Subscribe(payload: IRequest){ //tba
        
        let RequestEndpoint = new RequestEndpoints()
        EndpointFeeder.FeedRequestEndpoint (payload,RequestEndpoint)
        let ProtoBufWrapper = new ProtoWrapper(this.ProtoInstance.RequestType);
        let protoEncodedMessage = ProtoBufWrapper.EncodeMessage(payload)
        websocketHelper.SendWebsocketMessage(protoEncodedMessage)//not tested

    }
}