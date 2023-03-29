import { Observable, Subject } from "rxjs";
import { EndpointsSubjects } from "src/app/helper/Subject/Endpoints-Subjects";
import { EndpointsMap } from "src/app/helper/Endpoint Managment/EnpointMap";
import { SubjectHandler } from "../../helper/Subject/Subject-helper";
import { IResponse } from "../../helper/Endpoint Managment/model/IResponse";
import { RequestIdHandler } from "../../helper/Subject/RequestIdHandler";
import { WebSocketBroadcast } from "../Implementation/WebSocketBroadcast";
import { AppModule } from "src/app/app.module";
import { IRequest } from "src/app/helper/Endpoint Managment/model/IRequest";
import { LoginResponse } from "src/app/models/login-response";

export abstract class IEndpoint<R extends IResponse>{
    private subject!: EndpointsSubjects;
    private WebsocketBroadcast!: WebSocketBroadcast
    

    constructor(responseType: {new():R}){
        this.subject = AppModule.injectorInstance.get(EndpointsSubjects)
        this.WebsocketBroadcast = AppModule.injectorInstance.get(WebSocketBroadcast)

        let className = this.constructor.name;
        EndpointsMap.CreateEndpoint(LoginResponse,Object.getPrototypeOf(this).constructor)
        this.subject.createNewsubject<R>(className, new responseType());
    }

    protected ProcessData<R>(ResponseObject: R):any{
        return ResponseObject;
    }

    handle<R>(responseObj: R): void {
        let obj = this.ProcessData(responseObj)
        obj.constructor
        this.subject.updateSubject<typeof obj.constructor>(this.constructor.name, obj);
    }

    //Subscribes localy
    SubscribeToBroadcast<requestType extends IRequest>(request: requestType ):Observable<R>{
        request.isSubscribe = true
        this.WebsocketBroadcast.Subscribe(request)
        return this.subject.getSubjectObservable<R>(this.constructor.name)
    }
}
