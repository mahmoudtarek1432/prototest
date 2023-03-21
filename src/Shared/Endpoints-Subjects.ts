import { BehaviorSubject, Observable } from "rxjs";
import { SubjectHandler } from "src/app/helper/Subject-helper";
import { LoginRequest } from "src/app/models/login-request";
import { LoginResponse } from "src/app/models/login-response";

export class EndpointsSubjects{
    subjectHandlers:{[requestId:number] : SubjectHandler<any>}; // to be changed

    constructor(){
        this.subjectHandlers = {};
    }

    //gets created upon request, marks a request was fired
    createNewsubject<T>(requestId:number, subjectType:T){
        this.subjectHandlers[requestId] = new SubjectHandler<T>(subjectType)
    }

    updateSubject<T>(requestId:number, subjectType:T){
        let subject = this.subjectHandlers[requestId];
        if(subject == undefined)
            throw Error("subject Not Found")
        subject.updateSubject(subjectType)
    }

    getSubjectObservable<T>(requestId:number): Observable<T>{
        let subject = this.subjectHandlers[requestId];
        if(subject)
            return this.subjectHandlers[requestId].getSubjectObservable()
        throw Error("subject Not Found")
    }

}
