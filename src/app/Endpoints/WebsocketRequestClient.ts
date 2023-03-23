import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ProtobufType } from "src/ProtoWraper/ProtoBufType";
import { ProtoRootInstance } from "src/ProtoWraper/ProtoRootInstance";
import { ProtoWrapper } from "src/ProtoWraper/protowrapper";
import { EndpointsSubjects } from "src/Shared/Endpoints-Subjects";
import { websocketHelper } from "../helper/WebsocketHelper";
import { EndpointRequests } from "../models/endpoint-requests";
import { IRequestEndpoint } from "./IRequestEndpoint";
import { RequestIdHandler } from "./RequestIdHandler";

@Injectable({
    providedIn: 'root'
  })
export class WebsocketRequestClient implements IRequestEndpoint{
    constructor(private subject: EndpointsSubjects, private ProtoInstance: ProtoRootInstance){
    }
    async request<R>(payload:object){ //tba
        let requestId = RequestIdHandler.generateRequestId();
        this.subject.createNewsubject(requestId,null);
        let requestSubject = this.subject.getSubjectObservable<R>(requestId)
        //send
        
        
        let ProtoBufWrapper = new ProtoWrapper(this.ProtoInstance);
        let protoEncodedMessage = ProtoBufWrapper.EncodeMessage(payload)
        websocketHelper.SendWebsocketMessage(protoEncodedMessage)//not tested
        return requestSubject
    }

    async requestNoType<R>(payload:object){ //tba
        let requestId = RequestIdHandler.generateRequestId();
        this.subject.createNewsubject(requestId,null);
        let requestSubject = this.subject.getSubjectObservable<R>(requestId)
        let ProtoBufWrapper = new ProtoWrapper(this.ProtoInstance);
        let protoEncodedMessage = ProtoBufWrapper.EncodeMessage(payload)
        websocketHelper.SendWebsocketMessage(protoEncodedMessage)//not tested
        return requestSubject
    }
}