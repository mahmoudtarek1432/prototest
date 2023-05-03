import { Injectable } from "@angular/core";
import { ProtoWrapper } from "src/app/helper/Protobuf/protowrapper";
import { websocketHelper } from "../../helper/Websocket/WebsocketHelper";
import { ProtoRootComposer } from "src/app/helper/Protobuf/ProtoRootComposer";
import { IRequest } from "src/app/helper/Endpoint Managment/model/IRequest";
import { RequestEndpoints } from "src/app/models/endpoint-requests";
import { EndpointFeeder } from "src/app/helper/Endpoint Managment/EndpointFeeder";
import { RequestIdHandler } from '../../helper/Subject/RequestIdHandler';

@Injectable({
    providedIn: 'root'
  })
  export class WebSocketBroadcast{
    constructor(private ProtoInstance: ProtoRootComposer){
    }
    Subscribe(payload: IRequest){ //tba
      let requestId = RequestIdHandler.generateRequestId();
      payload.request_id = requestId;
        let RequestEndpoint = new RequestEndpoints();
        EndpointFeeder.FeedRequestEndpoint (payload,RequestEndpoint);
        let ProtoBufWrapper = new ProtoWrapper(this.ProtoInstance.RequestType);
        let protoEncodedMessage = ProtoBufWrapper.EncodeMessage(payload);
        websocketHelper.SendWebsocketMessage(protoEncodedMessage); //not tested

    }
}