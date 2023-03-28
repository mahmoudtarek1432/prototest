import { Observable, Subject } from "rxjs";
import { EndpointsSubjects } from "src/app/helper/Subject/Endpoints-Subjects";
import { EndpointsMap } from "src/app/helper/Endpoint Managment/EnpointMap";
import { SubjectHandler } from "../../helper/Subject/Subject-helper";
import { IResponse } from "../../helper/Endpoint Managment/model/IResponse";
import { RequestIdHandler } from "../../helper/Subject/RequestIdHandler";
import { WebSocketBroadcast } from "../Implementation/WebSocketBroadcast";
import { AppModule } from "src/app/app.module";

export abstract class IResponseEndpoint<R extends IResponse>{
    private subject!: EndpointsSubjects;
    private WebsocketBroadcast!: WebSocketBroadcast

    constructor(responseType: {new():R}){
        this.subject = AppModule.injectorInstance.get(EndpointsSubjects)
        this.WebsocketBroadcast = AppModule.injectorInstance.get(WebSocketBroadcast)

        let className = this.constructor.name;
        let childClass = Object.getPrototypeOf(className);
        EndpointsSubjects.createNewsubject<R>(className, new responseType());
    }

    protected ProcessData<R>(ResponseObject: R):any{
        return ResponseObject;
    }

    handle<R>(responseObj: R): void {
        let obj = this.ProcessData(responseObj)
        obj.constructor
        EndpointsSubjects updateSubject<typeof obj.constructor>(this.constructor.name, obj);
    }

    //Subscribes localy
    SubscribeToBroadcast():Observable<R>{
        WebSocketBroadcast.
        return EndpointsSubjects.getSubjectObservable<R>(this.constructor.name)
    }
}
