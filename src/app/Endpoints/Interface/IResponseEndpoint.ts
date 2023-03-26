import { Observable, Subject } from "rxjs";
import { EndpointsSubjects } from "src/Shared/Endpoints-Subjects";
import { EndpointsMap } from "src/Shared/EnpointMap";
import { SubjectHandler } from "../../helper/Subject-helper";
import { IResponse } from "../../models/IResponse";
import { RequestIdHandler } from "../../helper/RequestIdHandler";

export abstract class IResponseEndpoint<R extends IResponse>{
    constructor(private subject: EndpointsSubjects,responseType: {new():R}){
        let className = this.constructor.name;
        let childClass = Object.getPrototypeOf(className);
        subject.createNewsubject<R>(className, new responseType());
    }

    abstract handle(handleData:any):void;
    abstract handle<T>(handleData:any):void;
    SubscribeToBroadcast():Observable<R>{
        return this.subject.getSubjectObservable<R>(this.constructor.name)
    }
}
