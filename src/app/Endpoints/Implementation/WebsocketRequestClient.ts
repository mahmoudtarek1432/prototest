import { Injectable } from "@angular/core";
import { ProtoWrapper } from "src/app/helper/Protobuf/protowrapper";
import { EndpointsSubjects } from "src/app/helper/Subject/Endpoints-Subjects";
import { websocketHelper } from "../../helper/Websocket/WebsocketHelper";
import { RequestIdHandler } from "../../helper/Subject/RequestIdHandler";
import { ProtoRootInstance } from "src/app/helper/Protobuf/ProtoRootInstance";
import { IResponse } from "src/app/helper/Endpoint Managment/model/IResponse";
import { IRequest } from "src/app/helper/Endpoint Managment/model/IRequest";

@Injectable({
    providedIn: 'root'
  })
  export class WebsocketRequestClient{
    constructor(private subject: EndpointsSubjects, private ProtoInstance: ProtoRootInstance){
    }
    request<Res extends IResponse>(payload: IRequest){ //tba
        let requestId = RequestIdHandler.generateRequestId();
        this.subject.createNewsubject(requestId,null);
        let requestSubject = this.subject.getSubjectObservable<Res>(requestId)
        //send
        let ProtoBufWrapper = new ProtoWrapper(this.ProtoInstance);
        let protoEncodedMessage = ProtoBufWrapper.EncodeMessage(payload)
        websocketHelper.SendWebsocketMessage(protoEncodedMessage)//not tested
        return requestSubject
    }
}