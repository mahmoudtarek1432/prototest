import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { EndpointsSubjects } from "src/Shared/Endpoints-Subjects";
import { IRequestEndpoint } from "./IRequestEndpoint";
import { RequestIdHandler } from "./RequestIdHandler";

@Injectable({
    providedIn: 'root'
  })
export class WebsocketRequestClient implements IRequestEndpoint{
    constructor(subject: EndpointsSubjects){
    }
    request<R>(){
        let requestId = RequestIdHandler.generateRequestId();
        subject.createNewsubject(requestId.toString(),null);
    }
}