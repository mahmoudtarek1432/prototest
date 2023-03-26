import { Observable, Subject } from "rxjs";
import { EndpointsSubjects } from "src/app/helper/Subject/Endpoints-Subjects";
import { EndpointsMap } from "src/app/helper/Endpoint Managment/EnpointMap";
import { SubjectHandler } from "../../helper/Subject/Subject-helper";
import { IResponse } from "../../helper/Endpoint Managment/model/IResponse";
import { RequestIdHandler } from "../../helper/Subject/RequestIdHandler";

export abstract class IResponseEndpoint<R extends IResponse>{
    constructor(private subject: EndpointsSubjects,responseType: {new():R}){
        let className = this.constructor.name;
        let childClass = Object.getPrototypeOf(className);
        subject.createNewsubject<R>(className, new responseType());
    }

    protected ProcessData<R>(ResponseObject: R):any{
        return ResponseObject;
    }

    handle<R>(responseObj: R): void {
        let obj = this.ProcessData(responseObj)
        obj.constructor
        this.subject.updateSubject<typeof obj.constructor>(this.constructor.name, obj);
    }

    SubscribeToBroadcast():Observable<R>{
        return this.subject.getSubjectObservable<R>(this.constructor.name)
    }
}
