import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ProtobufType } from "src/ProtoWraper/ProtoBufType";
import { ProtoWrapper } from "src/ProtoWraper/protowrapper";
import { EndpointsSubjects } from "src/Shared/Endpoints-Subjects";
import { ProtoHelper } from "../helper/proto-helper";
import { websocketHelper } from "../helper/WebsocketHelper";
import { EndpointRequests } from "../models/endpoint-requests";
import { IRequestEndpoint } from "./IRequestEndpoint";
import { RequestIdHandler } from "./RequestIdHandler";

@Injectable({
    providedIn: 'root'
  })
export class WebsocketRequestClient implements IRequestEndpoint{
    constructor(private subject: EndpointsSubjects){
    }
    async request<R>(payload:object, ProtofileDetails: ProtobufType){ //tba
        let requestId = RequestIdHandler.generateRequestId();
        this.subject.createNewsubject(requestId,null);
        let requestSubject = this.subject.getSubjectObservable<R>(requestId)
        //send
        let protoEncodedMessage = await ProtoHelper.encode(ProtofileDetails.filename,ProtofileDetails.packageName,ProtofileDetails.className,payload) //not tested
        websocketHelper.SendWebsocketMessage(protoEncodedMessage)//not tested
        return requestSubject
    }

    async requestNoType<R>(payload:object){ //tba
        let ProtofileDetails = new ProtobufType('./assets/protos/ResponseEndpoint.proto', 'ResponsePackage', 'endpoint_responses')
        let requestId = RequestIdHandler.generateRequestId();
        this.subject.createNewsubject(requestId,null);
        let requestSubject = this.subject.getSubjectObservable<R>(requestId)
        //send
        let protoEncodedMessage = await ProtoHelper.encode(ProtofileDetails.filename,ProtofileDetails.packageName,ProtofileDetails.className,payload) //not tested
        websocketHelper.SendWebsocketMessage(protoEncodedMessage)//not tested
        return requestSubject
    }
}